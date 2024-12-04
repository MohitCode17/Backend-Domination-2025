import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error connection to database");
    });

    await mongoose.connect("mongodb://localhost:27017/bookApi");
  } catch (err) {
    console.log("Failed to connect with database", err);
    process.exit(1);
  }
};
