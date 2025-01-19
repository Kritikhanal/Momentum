import express from "express";
import {
  login,
  register,
  logout,
  getUser,
  uploadProfilePicture,
  getProfilePicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/updateprofile", isAuthenticated, uploadProfilePicture);
router.get("/profile-picture", isAuthenticated, getProfilePicture);

export default router;
