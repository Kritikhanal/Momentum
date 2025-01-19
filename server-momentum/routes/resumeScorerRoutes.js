import express from "express";
import { processResume } from "../controllers/resumeController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route for uploading resume and job description
router.post("/score", isAuthenticated, processResume);

export default router;
