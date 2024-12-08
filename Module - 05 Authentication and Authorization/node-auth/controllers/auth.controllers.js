import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exist in database
    const checkUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkUserExist)
      return res.status(400).json({
        success: false,
        message:
          "User is already exists either with same username or email. Please try with a different username or email",
      });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to register user, Please try again!",
    });
  }
};

// Login user controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find if user exists of not
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User doesn't exists with this email!",
      });

    // Check users password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    // Create JWT Token and Sent to Cookie
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to login, Please try again!",
    });
  }
};

// Change password controller
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    const { oldPassword, newPassword } = req.body;

    // Check if old password is match
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch)
      return res.status(400).json({
        success: false,
        message: "Old password is not correct! Please try again",
      });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // Update new password
    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to change password! Please try again",
    });
  }
};

// Logout user controller
export const logoutUser = async (req, res) => {};
