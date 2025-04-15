import mongoose from "mongoose";

const roomNoteSchema = new mongoose.Schema({
  roomid: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: String, required: true }, // user email or name
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7 // ⏳ Auto-delete after 7 days
  }
});

export const RoomNotes = mongoose.model("RoomNotes", roomNoteSchema, "RoomNotes");
