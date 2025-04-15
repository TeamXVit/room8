import express from "express";
import { createRoom, requestJoin, acceptRoommate, getroomdata } from "../controllers/RoomsController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createRoom);         // Only logged-in users can create
router.post("/request", authenticateToken, requestJoin);                          // Open for join requests
router.post("/accept", authenticateToken, acceptRoommate);     // Only room leader can accept
router.get("/:roomid", authenticateToken, getroomdata);

export default router;
