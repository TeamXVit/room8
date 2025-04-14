import { Rooms } from "../models/Rooms.js"

export async function createRoom(req, res) {
    try {
        const { roomid, address } = req.body;
        const leader = req.user.email; // from JWT token

        if (!roomid || !address) {
            return res.status(400).send({ error: "roomid and address are required" });
        }

        const room = await Rooms.create({ roomid, address, leader, roommates: [] });
        return res.status(200).send({ message: "Room created", room });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

export async function requestJoin(req, res) {
    try {
        const { roomid } = req.body;
        const email = req.user.email; // Get email from JWT token

        const room = await Rooms.findOne({ roomid });
        if (!room) return res.status(404).send({ error: "Room not found" });

        const alreadyRequested = room.roommates.find(r => r.email === email);
        if (alreadyRequested) {
            return res.status(400).send({ error: "Already requested or added" });
        }

        room.roommates.push({ email, confirmed: false });
        await room.save();
        return res.status(200).send({ message: "Join request sent" });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}


export async function acceptRoommate(req, res) {
    try {
        const { roomid, email } = req.body;
        const room = await Rooms.findOne({ roomid });

        if (!room) return res.status(404).send({ error: "Room not found" });

        // Only leader can accept
        if (req.user.email !== room.leader) {
            return res.status(403).send({ error: "Access denied. Only the room leader can accept roommates." });
        }

        const roommate = room.roommates.find(r => r.email === email);
        if (!roommate) {
            return res.status(404).send({ error: "No join request found for this email" });
        }

        roommate.confirmed = true;
        await room.save();
        return res.status(200).send({ message: "Roommate accepted" });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}


