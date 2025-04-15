import express from 'express';
import { createChore, getRoomChores, markChoreDone, verifyChore} from '../controllers/ChoresController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const choreRouter = express.Router();

choreRouter.post('/', authenticateToken, createChore); // anyone creates
choreRouter.get('/room/:roomid', authenticateToken, getRoomChores); // load chores of room
choreRouter.patch('/:choreId/mark-done', authenticateToken, markChoreDone); // assigned person marks done
choreRouter.patch('/:choreId/verify', authenticateToken, verifyChore); // leader verifies

export default choreRouter;
