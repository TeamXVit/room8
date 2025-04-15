import { Chores } from "../models/Chores.js";

export async function createChore(req, res) {
    const { roomid, title, description, createdBy, dueDate } = req.body;
    try {
        const assignedTo = await getNextAssignee(roomid);

        const chore = await Chores.create({
            roomid, title, description, assignedTo, createdBy, dueDate
        });

        res.status(201).json({ message: "Chore created", chore });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getNextAssignee(roomid) {
    const room = await Rooms.findOne({ roomid });
    const members = room.roommates.map(r => r.email);

    const count = {};
    for (let email of members) count[email] = 0;

    const chores = await Chores.find({ roomid });
    chores.forEach(chore => {
        if (chore.assignedTo in count) {
            count[chore.assignedTo]++;
        }
    });

    const sorted = Object.entries(count).sort((a, b) => a[1] - b[1]);
    return sorted[0][0]; // least assigned
}

export async function getRoomChores(req, res) {
    try {
        const { roomid } = req.params;
        const chores = await Chores.find({ roomid }).sort({ createdAt: -1 });
        res.json(chores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function markChoreDone(req, res) {
    try {
        const { choreId } = req.params;
        const { email } = req.user;

        const chore = await Chores.findById(choreId);
        if (chore.assignedTo !== email) {
            return res.status(403).json({ error: "You are not assigned to this chore" });
        }

        chore.markedDone = true;
        chore.completedAt = new Date();
        await chore.save();

        res.json({ message: "Chore marked as done" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function verifyChore(req, res) {
    try {
        const { choreId } = req.params;

        const chore = await Chores.findById(choreId);
        if (!chore.markedDone) {
            return res.status(400).json({ error: "Chore not marked as done yet" });
        }

        chore.verified = true;
        await chore.save();

        // update credibility
        const user = await Users.findOne({ email: chore.assignedTo });
        if (user) {
            user.credibility.totalChores += 1;
            const onTime = new Date(chore.completedAt) <= new Date(chore.dueDate);
            if (onTime) user.credibility.completedOnTime += 1;

            const { totalChores, completedOnTime } = user.credibility;
            user.credibility.score = Math.round((completedOnTime / totalChores) * 100);
            await user.save();
        }

        res.json({ message: "Chore verified and credibility updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}