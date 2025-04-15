import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{type:String, require: true},
    upi:{type:String, require: true, unique: true},
    roomid: { type: String, default: null, sparse: true, unique: true },
    password:{type:String, require: true},
    email:{type:String, require: true, unique: true},
    phoneno:{type:String, require: true, unique: true},
    instagram:{type:String, require: true},
    bio:{type:String, require: true}
});

export const Users =  new mongoose.model("Users",usersSchema,"Users");