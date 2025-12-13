import express from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/note.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.post("/", VerifyToken, createNote);
router.get("/", VerifyToken, getNotes);
router.put("/:id", VerifyToken, updateNote);
router.delete("/:id", VerifyToken, deleteNote);

export default router;
