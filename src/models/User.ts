import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  instagramId: string
  bio: string
  interests: string[]
  age: number
  crushes: mongoose.Types.ObjectId[]
  matches: mongoose.Types.ObjectId[]
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    instagramId: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    interests: [{ type: String }],
    age: { type: Number, required: true },
    crushes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IUser>("User", UserSchema)

