import { Users } from "../models/Users.js";
import jwt from "jsonwebtoken";

export async function createUser(request, response){
    try{
        const {name, password, email, phoneno, instagram, bio } = request.body;
        if(!name || !password || !email || !phoneno || !instagram || !bio){
            return response.status(400).send({
                error: "All required fields must be filled."
            }); 
        }
        await Users.create({name, password, email, phoneno, instagram, bio, roomid:null});
        return response.status(200).send({
            message:"User account created successfully"
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
}

export async function login(request, response){
    try{
        const {email, password} = request.body;
        if (!email || !password) {
            return response.status(400).send({
                error: "Email and password are required."
            });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return response.status(404).send({
                error: "User not found."
            });
        }
        if (user.password !== password) {
            return response.status(401).send({
                error: "Incorrect password."
            });
        }
        const token = jwt.sign(
            {id: user._id,email: user.email},
            process.env.JWT_SECRET
        );
        return response.status(200).send({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                phoneno: user.phoneno,
                instagram: user.instagram,
                bio: user.bio
            }
        });

    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
}

export async function getdata(request, response){
    try{
        const email = request.user.email; // from JWT token
        const user = await Users.findOne({ email });
        if (!user) {
            return response.status(404).send({
                error: "User not found."
            });
        }
        return response.status(200).send({
                name: user.name,
                email: user.email,
                phoneno: user.phoneno,
                instagram: user.instagram,
                bio: user.bio
            });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
}