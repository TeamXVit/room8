import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/UsersRouter.js";
import roomRouter from "./routes/RoomsRouter.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/profile", userRouter);
app.use("/room", roomRouter);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is active");
});

// Connect to MongoDB and start server
async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    // Start server only after successful DB connection
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Optional: Exit if DB connection fails
  }
}

connectDB();
