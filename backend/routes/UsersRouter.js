import express from "express";
import { createUser, login, getdata } from "../controllers/UsersController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.get("/data", authenticateToken, getdata);

export default userRouter;
