import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Profile route
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile",
    user: req.user, // Includes user data (email)
  });
});

export default router;
