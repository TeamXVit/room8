import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{type:String, require: true},
    password:{type:String, require: true},
    email:{type:String, require: true},
    phoneno:{type:String, require: true},
    instagram:{type:String, require: true},
    bio:{type:String, require: true},
});

export const Users =  new mongoose.model("Users",usersSchema,"Users");