import express from "express";
import {
  getProductsAnalysis,
  getProductsStats,
  insertDemoProducts,
} from "../controllers/product.controllers.js";

const router = express.Router();

// Add sample products
router.post("/add", insertDemoProducts);

// Get product stats
router.get("/stats", getProductsStats);

// Get product analysis
router.get("/analysis", getProductsAnalysis);

export default router;
