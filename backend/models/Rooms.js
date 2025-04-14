import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    roomid: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    leader: { // creaters email
        type: String,
        required: true
    },
    roommates: [
        {
            email: {
                type: String,
                required: true
            },
            confirmed: {
                type: Boolean,
                default: false
            }
        }
    ]
});


export const Rooms =  new mongoose.model("Rooms",roomsSchema,"Rooms");