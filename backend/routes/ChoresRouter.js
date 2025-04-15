import express from "express";
import { createChore, getRoomChores, markChoreDone } from "../controllers/ChoresController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const choreRouter = express.Router();

choreRouter.post("/create",authenticateToken, createChore);
choreRouter.get("/:roomid",authenticateToken, getRoomChores);
choreRouter.patch("/:choreId/complete",authenticateToken, markChoreDone);

export default choreRouter;
