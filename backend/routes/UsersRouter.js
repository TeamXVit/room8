import express from "express";
import { createUser, login } from "../controllers/UsersController.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", login);

export default userRouter;