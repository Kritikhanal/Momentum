import { Router } from "express";
import {
  getAllResumes,
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
  getResumePDF,
  saveResumeForUser,
  getUserResumes,
} from "../controllers/resume-genController.js";

const router = Router();
router.post("/resumes", createResume);
router.get("/resumes", getAllResumes);
router.get("/resumes/:id", getResumeById);
router.put("/resumes/:id", updateResume);
router.delete("/resumes/:id", deleteResume);
router.get("/resumes/:id/pdf", getResumePDF);
router.post("/users/:userId/resumes/save", saveResumeForUser);
router.get("/users/:userId/resumes", getUserResumes);

export default router;
