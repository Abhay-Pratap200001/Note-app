import express from "express";
import { profile, signin, signOut, signup } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signOut', signOut)
router.get("/profile", verifyToken, profile);


export default router;
