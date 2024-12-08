import cloudinary from "../config/cloudinary.js";
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

// Delete image controller
export const deleteImage = async (req, res) => {
  const imageId = req.params.id;
  const userId = req.user.userId;

  const image = await Image.findById(imageId);

  if (!image)
    return res.status(404).json({
      success: false,
      message: "Image not found.",
    });

  // Check if image is uploaded by current user, who is trying to delete this image
  if (image?.uploadedBy.toString() !== userId) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this image.",
    });
  }

  // Delete image from cloudinary
  await cloudinary.uploader.destroy(image?.publicId);

  // Delete image from database
  await Image.findByIdAndDelete(imageId);

  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
  });
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete this image, Please try again",
    });
  }
};
