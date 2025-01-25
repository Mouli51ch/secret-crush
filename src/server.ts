import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoutes"
import chatRoutes from "./routes/chatRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error))

// Check for encryption key
if (!process.env.ENCRYPTION_KEY) {
  console.warn("Warning: ENCRYPTION_KEY not set in environment variables. Using default key.")
}

// Routes
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/chats", chatRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

