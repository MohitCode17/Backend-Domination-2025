import { uploadToCloudinary } from "../helper/cloudinary_upload.js";
import Image from "../models/image.model.js";
import fs from "fs";

// Upload image controller
export const uploadImage = async (req, res) => {
  try {
    // Check if file is missing in req object
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Upload to database
    const newUploadedImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.user.userId,
    });

    // Delete the file from local storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: false,
      message: "Image is uploaded.",
      image: newUploadedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to upload image, Please try again.",
    });
  }
};
