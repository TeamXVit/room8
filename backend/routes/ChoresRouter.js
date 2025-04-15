import express from 'express';
import { createChore, getRoomChores, markChoreDone, verifyChore} from '../controllers/ChoresController.js';

const choreRouter = express.Router();

choreRouter.post('/', createChore); // anyone creates
choreRouter.get('/room/:roomid', getRoomChores); // load chores of room
choreRouter.patch('/:choreId/mark-done', markChoreDone); // assigned person marks done
choreRouter.patch('/:choreId/verify', verifyChore); // leader verifies

export default choreRouter;
