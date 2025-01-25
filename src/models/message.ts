import mongoose, { type Document, Schema } from "mongoose"

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId
  receiverId: mongoose.Types.ObjectId
  encryptedContent: string
  timestamp: Date
  type: "text" | "emoji" | "file" | "link" | "audio"
  fileUrl?: string
  fileName?: string
  audioDuration?: number
  linkPreview?: {
    title: string
    description: string
    imageUrl: string
  }
}

const MessageSchema: Schema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    encryptedContent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ["text", "emoji", "file", "link", "audio"], required: true },
    fileUrl: { type: String },
    fileName: { type: String },
    audioDuration: { type: Number },
    linkPreview: {
      title: { type: String },
      description: { type: String },
      imageUrl: { type: String },
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IMessage>("Message", MessageSchema)

