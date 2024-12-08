import { config } from "dotenv";
config();

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import homeRoute from "./routes/home.route.js";
import adminRoute from "./routes/admin.route.js";
import imageRoutes from "./routes/image.route.js";
import { connectDB } from "./database/db.js";

const app = express();
const port = process.env.PORT;

// Database connections
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Server is on.");
});

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoute);
app.use("/api/admin", adminRoute);
app.use("/api/image", imageRoutes);

app.listen(port, () => console.log(`Server running at port: ${port}`));
