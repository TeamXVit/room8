import { Rooms } from "../models/Rooms.js"

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

export async function getroomdata(request, response){
    try{
        const roomid = request.params.roomid;
        const room = await Rooms.findOne({ roomid });
        if (!room) return response.status(404).send({ error: "Room not found" });
        return response.status(200).send(room);
    }catch(err){
        return response.status(500).send({ error: err.message });
    }
}