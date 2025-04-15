import express from "express";
import { createExpense, markPaid, verifyPayment, getExpensesByRoom, getMonthlyExpenses } from "../controllers/ExpensesController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const expenseRouter = express.Router();

expenseRouter.post("/create", authenticateToken, createExpense);
expenseRouter.patch("/markpaid", authenticateToken, markPaid);
expenseRouter.patch("/verify", authenticateToken, verifyPayment);
expenseRouter.get("/roomexpenses/:roomid", authenticateToken, getExpensesByRoom);
expenseRouter.get("/monthlyexpenses/:roomid", authenticateToken, getMonthlyExpenses);

export default expenseRouter;

