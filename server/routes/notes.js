import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.post("/", authMiddleware, async (req, res) => {
  const note = await Note.create({
    userId: req.user.id,
    text: req.body.text
  });
  res.json(note);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

export default router;
