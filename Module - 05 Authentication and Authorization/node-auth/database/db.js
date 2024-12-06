import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected!");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error connecting with database", err);
    });

    await mongoose.connect(process.env.DB_CONNECTION_URL);
  } catch (error) {
    console.log("Failed to connect database", error);
    process.exit(1);
  }
};
