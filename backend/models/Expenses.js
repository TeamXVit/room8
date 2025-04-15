import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    roomid: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    createdBy: { type: String, required: true }, // creator's email
    createdAt: { type: Date, default: Date.now },
    shares: [
        {
            email: { type: String, required: true },
            shareAmount: { type: Number, required: true },
            paid: { type: Boolean, default: false },
            verified: { type: Boolean, default: false }
        }
    ]
});

export const Expenses =  new mongoose.model("Expenses",expensesSchema,"Expenses");