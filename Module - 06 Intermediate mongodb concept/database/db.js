import mongoose from "mongoose";

const DB_URL =
  "mongodb://127.0.0.1:27017/intermediate-db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected!");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error connecting with database", err);
    });

    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log("Failed to connect database", error);
    process.exit(1);
  }
};
