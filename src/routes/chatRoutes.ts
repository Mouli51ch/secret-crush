import express from "express"
import Chat from "../models/chat"

const router = express.Router()

// Get all chats for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.userId })
      .populate("participants", "firstName lastName imageUrl")
      .populate("lastMessage")
      .sort("-updatedAt")
    res.json(chats)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
})

// Get a specific chat
router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate("participants", "firstName lastName imageUrl")
      .populate("lastMessage")
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" })
    }
    res.json(chat)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
})

// Create a new chat
router.post("/", async (req, res) => {
  const chat = new Chat(req.body)

  try {
    const newChat = await chat.save()
    res.status(201).json(newChat)
  } catch (err) {
    res.status(400).json({ message: (err as Error).message })
  }
})

// Update a chat
router.patch("/:id", async (req, res) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" })
    }
    res.json(updatedChat)
  } catch (err) {
    res.status(400).json({ message: (err as Error).message })
  }
})

export default router

