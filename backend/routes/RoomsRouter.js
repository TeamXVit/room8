import express from "express";
import { createRoom, requestJoin, acceptRoommate } from "../controllers/RoomsController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createRoom);         // Only logged-in users can create
router.post("/request", authenticateToken, requestJoin);                          // Open for join requests
router.post("/accept", authenticateToken, acceptRoommate);     // Only room leader can accept

export default router;
