import express from "express";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // For demo purposes, hardcoded admin credentials
    if (email === "admin@example.com" && password === "admin123") {
      const token = jwt.sign(
        { id: 1, email, role: "admin" },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1d" },
      );

      return res.json({
        success: true,
        token,
        user: { id: 1, email, role: "admin" },
      });
    }

    // Check database for user
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // In a real app, you would verify the password with bcrypt
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // For demo, we'll just check if password matches
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  // In a stateful server, you would invalidate the token
  // For JWT, client-side logout is sufficient
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
