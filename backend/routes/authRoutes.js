import express from "express";
import { login } from "../controllers/authcontrollers.js";

const router = express.Router();

// Route for user login
router.post("/login", login);       
// Route for user registration (if needed, can be added later)

export default router;