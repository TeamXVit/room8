import express from "express";
import { createRoom, requestJoin, acceptRoommate, getroomdata } from "../controllers/RoomsController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const roomRouter = express.Router();

roomRouter.post("/create", authenticateToken, createRoom);         // Only logged-in users can create
roomRouter.post("/request", authenticateToken, requestJoin);                          // Open for join requests
roomRouter.post("/accept", authenticateToken, acceptRoommate);     // Only room leader can accept
roomRouter.get("/:roomid", authenticateToken, getroomdata);

export default roomRouter;
