import mongoose from "mongoose";

const choreSchema = new mongoose.Schema({
    roomid: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: String, required: true }, // creator email
    doneBy: { type: String, default: null }, // person who marked done
    done: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: '7d' } // auto-delete after 7 days
});

export const Chores = mongoose.model("Chores", choreSchema, "Chores");
