import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

// Configure environment variables
dotenv.config();

const app = express();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

console.log("Consoling var:", mongoURI);

const connectDB = async () => {
  try {
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined");
    }
    const connection = await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB Database: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB connection: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", router);
app.use("/api", productRouter);
app.use("/api", categoryRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on ${port}`));
