import mongoose from "mongoose";

const choreSchema = new mongoose.Schema({
    roomid: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: String, required: true }, // roommate's email
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    markedDone: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    completedAt: { type: Date }
});

export const Chores = new mongoose.model("Chores", choreSchema, "Chores");