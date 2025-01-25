import express from "express"
import User from "../models/User"

const router = express.Router()

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-crushes -matches")
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
})

// Get one user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-crushes -matches")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
})

// Create one user
router.post("/", async (req, res) => {
  const user = new User(req.body)

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: (err as Error).message })
  }
})

// Update one user
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: (err as Error).message })
  }
})

// Delete one user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ message: "User deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
})

export default router

