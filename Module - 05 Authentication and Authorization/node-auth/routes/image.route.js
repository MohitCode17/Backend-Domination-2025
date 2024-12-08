import express from "express";
import { uploadImage } from "../controllers/image.controllers.js";
import { checkAuth } from "../middlewares/auth_middleware.js";
import { checkAdminAccess } from "../middlewares/admin_auth_middleware.js";
import upload from "../middlewares/image_upload.js";

const router = express.Router();

// Upload Image (Admin Access - Private Route)
router.post(
  "/upload",
  checkAuth,
  checkAdminAccess,
  upload.single("image"),
  uploadImage
);

export default router;
