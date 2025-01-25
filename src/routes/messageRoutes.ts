import express from "express"
import Message from "../models/message"
import Chat from "../models/chat"
import { encryptMessage, decryptMessage } from "../utils/encryption"

const router = express.Router()

// Get all messages for a chat
router.get("/chat/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.params.chatId }, { receiverId: req.params.chatId }],
    }).sort("timestamp")

    // Decrypt messages before sending
    const decryptedMessages = messages.map((message) => ({
      ...message.toObject(),
      content: decryptMessage(message.encryptedContent),
    }))

    res.json(decryptedMessages)
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err })
  }
})

// Create a new message
router.post("/", async (req, res) => {
  const { content, ...messageData } = req.body
  const encryptedContent = encryptMessage(content)

  const message = new Message({
    ...messageData,
    encryptedContent,
  })

  try {
    const newMessage = await message.save()

    // Update or create the corresponding chat
    await Chat.findOneAndUpdate(
      { participants: { $all: [req.body.senderId, req.body.receiverId] } },
      {
        $set: { lastMessage: newMessage._id },
        $inc: { [`unreadCount.${req.body.receiverId}`]: 1 },
      },
      { upsert: true, new: true },
    )

    // Send back the decrypted message
    const decryptedMessage = {
      ...newMessage.toObject(),
      content: decryptMessage(newMessage.encryptedContent),
    }

    res.status(201).json(decryptedMessage)
  } catch (err) {
    res.status(400).json({ message: "Error creating message", error: err })
  }
})

export default router

