import {Expenses} from "../models/Expenses.js"

export async function createExpense(req, res) {
    try {
        const { roomid, title, amount, shares } = req.body;
        const createdBy = req.user.email;
        if (!roomid || !title || !amount || !shares) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const expense = await Expenses.create({
            roomid,
            title,
            amount,
            createdBy,
            shares // array of { email, shareAmount }
        });

        res.status(200).send({ message: "Expense created", expense });
    } catch (err) {
        res.status(500).send({ error: `Error creating expense: ${err.message}` });
    }
}

export async function markPaid(req, res) {
    try {
        const { expenseId } = req.body;
        const email = req.user.email;

        const expense = await Expenses.findById(expenseId);
        if (!expense) return res.status(404).send({ error: "Expense not found" });

        const share = expense.shares.find(s => s.email === email);
        if (!share) return res.status(404).send({ error: "User not part of expense" });

        share.paid = true;
        await expense.save();

        res.send({ message: "Marked as paid" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export async function verifyPayment(req, res) {
    try {
        const { expenseId, memberEmail } = req.body;
        const creatorEmail = req.user.email;

        const expense = await Expenses.findById(expenseId);
        if (!expense) return res.status(404).send({ error: "Expense not found" });
        if (expense.createdBy !== creatorEmail) return res.status(403).send({ error: "Unauthorized" });

        const share = expense.shares.find(s => s.email === memberEmail);
        if (!share || !share.paid) return res.status(400).send({ error: "User hasn't paid yet" });

        share.verified = true;
        await expense.save();

        res.send({ message: "Payment verified" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export async function getExpensesByRoom(req, res) {
    try {
        const { roomid } = req.params;
        const expenses = await Expenses.find({ roomid });
        res.status(200).send(expenses);
    } catch (err) {
        res.status(500).send({ error: `Error fetching expenses: ${err.message}` });
    }
}

export async function getMonthlyExpenses(req, res) {
    try {
        const { roomid } = req.params;

        const monthlyExpenses = await Expenses.aggregate([
            { $match: { roomid } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Format output for frontend charting
        const formatted = monthlyExpenses.map(item => ({
            month: `${item._id.month}-${item._id.year}`,
            total: item.totalAmount
        }));

        res.status(200).json(formatted);
    } catch (err) {
        res.status(500).json({ error: `Failed to get monthly expenses: ${err.message}` });
    }
}
