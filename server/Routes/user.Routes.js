import express from "express";
import { profile, signin, signOut, signup } from "../controller/auth.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signOut', signOut)
router.get("/profile", VerifyToken, profile);


export default router;
