import { Rooms } from "../models/Rooms.js"
import { Users } from "../models/Users.js";

export async function createRoom(request, response) {
    try {
        const { roomid, address } = request.body;
        const leader = request.user.email; // from JWT token

        if (!roomid || !address) {
            return response.status(400).send({ error: "roomid and address are required" });
        }

        const room = await Rooms.create({ roomid, address, leader, roommates: [] });
        return response.status(200).send({ message: "Room created", roomid });
    } catch (err) {
        return response.status(500).send({ error: err.message });
    }
}

export async function requestJoin(request, response) {
    try {
        const { roomid } = request.body;
        const email = request.user.email; // Get email from JWT token

        const room = await Rooms.findOne({ roomid });
        if (!room) return response.status(404).send({ error: "Room not found" });

        const alreadyRequested = room.roommates.find(r => r.email === email);
        if (alreadyRequested) {
            return response.status(400).send({ error: "Already requested or added" });
        }

        room.roommates.push({ email, confirmed: false });
        await room.save();
        return response.status(200).send({ message: "Join requestuest sent", roomid });
    } catch (err) {
        return response.status(500).send({ error: err.message });
    }
}

export async function acceptRoommate(request, response) {
    try {
        const { roomid, email } = request.body;
        const room = await Rooms.findOne({ roomid });

        if (!room) return response.status(404).send({ error: "Room not found" });

        // Only leader can accept
        if (request.user.email !== room.leader) {
            return response.status(403).send({ error: "Access denied. Only the room leader can accept roommates." });
        }

        const roommate = room.roommates.find(r => r.email === email);
        if (!roommate) {
            return response.status(404).send({ error: "No join request found for this email" });
        }

        roommate.confirmed = true;
        await room.save();
        return response.status(200).send({ message: "Roommate accepted" });
    } catch (err) {
        return response.status(500).send({ error: err.message });
    }
}

export async function getroomdata(req, res) {
    try {
        const roomid = req.params.roomid;
        const room = await Rooms.findOne({ roomid });

        if (!room) return res.status(404).send({ error: "Room not found" });

        // fetch names of roommates
        const roommatesWithNames = await Promise.all(
            room.roommates.map(async (member) => {
                const user = await Users.findOne({ email: member.email });
                return {
                    email: member.email,
                    name: user?.name || "Unknown",
                    confirmed: member.confirmed
                };
            })
        );

        // include enhanced roommates list
        const roomData = {
            ...room.toObject(),
            roommates: roommatesWithNames
        };

        return res.status(200).send(roomData);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}