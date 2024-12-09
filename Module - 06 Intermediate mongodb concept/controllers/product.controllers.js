import { sampleProducts } from "../sample-products.js";
import Product from "../models/product.model.js";

export const insertDemoProducts = async (req, res) => {
  try {
    const result = await Product.insertMany(sampleProducts);

    res.status(201).json({
      success: true,
      message: `Inserted sample products successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to insert products, Please try again",
    });
  }
};

export const getProductsStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      // Stage 1
      // Filter those products, where inStock value is true and price is more than 100
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      // State 2 Group documents
      // Group products by category and
      // then you'll need to calculate the average price of each category
      // then count the products of each category
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to insert products, Please try again",
    });
  }
};

export const getProductsAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          averagePrice: {
            $avg: "$price",
          },
          maximumPrice: {
            $max: "$price",
          },
          minimumPrice: {
            $min: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maximumPrice: 1,
          minimumPrice: 1,
          priceRange: {
            $subtract: ["$maximumPrice", "$minimumPrice"],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to insert products, Please try again",
    });
  }
};
