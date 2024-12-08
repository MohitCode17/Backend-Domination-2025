import express from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import {checkAuth} from "../middlewares/auth_middleware.js";

const router = express.Router();


// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Change password route
router.post("/change-password", checkAuth, changePassword);

// Logout Route
router.get("/logout", logoutUser);

export default router;
