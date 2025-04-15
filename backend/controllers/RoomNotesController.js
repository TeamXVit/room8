import { RoomNotes } from "../models/RoomNotes.js";

// POST /room-notes
export async function createRoomNote(req, res) {
    try {
      const { roomid, content } = req.body;
      const createdBy = req.user.email;
      if (!roomid || !content ) {
        return res.status(400).send({ error: "Missing fields" });
      }
  
      const note = await RoomNotes.create({ roomid, content, createdBy });
      res.status(201).send({ message: "Note created", note });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

// GET /room-notes/:roomid
export async function getRoomNotes(req, res) {
    try {
      const roomid = req.params.roomid;
      const notes = await RoomNotes.find({ roomid }).sort({ createdAt: -1 });
      res.status(200).send(notes);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  