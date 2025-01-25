import mongoose, { type Document, Schema } from "mongoose"

export interface IChat extends Document {
  participants: mongoose.Types.ObjectId[]
  lastMessage: mongoose.Types.ObjectId
  unreadCount: Map<string, number>
}

const ChatSchema: Schema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    unreadCount: { type: Map, of: Number, default: new Map() },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IChat>("Chat", ChatSchema)

