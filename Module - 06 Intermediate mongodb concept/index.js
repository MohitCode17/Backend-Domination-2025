import express from "express";
import { connectDB } from "./database/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();

// Mongodb connection
connectDB();

// Middleware

// Routes
app.use("/api/product", productRoutes);

app.listen(8000, () => console.log(`Server running at port 8000`));
