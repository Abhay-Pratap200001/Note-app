import express from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/note.controller.js";
import { verifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createNote);
router.get("/", verifyToken, getNotes);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
