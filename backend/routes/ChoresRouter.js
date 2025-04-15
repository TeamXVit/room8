import express from "express";
import { createChore, getRoomChores, markChoreDone } from "../controllers/ChoresController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const choreRouter = express.Router();

choreRouter.post("/create", createChore);
choreRouter.get("/:roomid", getRoomChores);
choreRouter.patch("/:choreId/complete", markChoreDone);

export default choreRouter;
