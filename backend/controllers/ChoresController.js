import { Chores } from "../models/Chores.js";

// POST /chores
export async function createChore(req, res) {
    try {
        const { roomid, title, description } = req.body;
        const createdBy = req.user.email;
        const chore = await Chores.create({ roomid, title, description, createdBy });
        res.status(201).send({ message: "Chore created", chore });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// GET /chores/:roomid
export async function getRoomChores(req, res) {
    try {
        const { roomid } = req.params;
        const chores = await Chores.find({ roomid });
        res.status(200).send(chores);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// PATCH /chores/:choreId/complete
export async function markChoreDone(req, res) {
    try {
        const { choreId } = req.params;
        const doneBy = req.user.email; // email of the person marking it done

        const chore = await Chores.findByIdAndUpdate(
            choreId,
            { done: true, doneBy },
            { new: true }
        );

        if (!chore) return res.status(404).send({ error: "Chore not found" });

        res.status(200).send({ message: "Chore marked as done", chore });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

