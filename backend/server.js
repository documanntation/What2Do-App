import express from "express"; // Ensure express is imported first
import cors from "cors"; // Import cors middleware

import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // Import auth routes
import protectedRoutes from "./routes/protected.js"; // Import protected routes
import connectDB from "./config/db.js"; // Import DB connection config

dotenv.config(); // Load environment variables

const app = express(); // Initialize express application
const PORT = 8000; // Set port

// Middleware
app.use(cors()); // Use CORS middleware before any route handling
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to the database
connectDB();

// Base Routes
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List App!");
});

app.get("/about", (req, res) => {
  res.send("Backend of To-Do List App with Node.js and Express.");
});

// API Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/protected", protectedRoutes); // Protected routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
