// Entry point for admin-page backend
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../../../user-ticket/backend/config/database.js"; // Reuse database connection
import adminRoutes from "../routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(5001, () => {
  console.log("===== Admin backend running on http://localhost:5001 =====");
});
