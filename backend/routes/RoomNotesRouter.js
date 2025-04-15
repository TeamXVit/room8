import express from "express";
import { createRoomNote, getRoomNotes } from "../controllers/RoomNotesController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const roomnoteRouter = express.Router();

roomnoteRouter.post("/create", authenticateToken, createRoomNote);
roomnoteRouter.get("/:roomid", authenticateToken, getRoomNotes);

export default roomnoteRouter;
