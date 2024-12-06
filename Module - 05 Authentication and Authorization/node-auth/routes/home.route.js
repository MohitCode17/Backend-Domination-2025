import express from "express";
import { checkAuth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/welcome", checkAuth, (req, res) => {
  try {
    const { username } = req.user;
    res.status(200).json({
      success: true,
      message: `Welcome to home page.`,
      user: { username },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to get home page, Please try again!",
      });
  }
});

export default router;
