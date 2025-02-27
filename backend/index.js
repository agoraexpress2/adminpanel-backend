import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";
import stampCardRoutes from "./routes/stamp-cards.js";
import giftCardRoutes from "./routes/gift-cards.js";
import policyPageRoutes from "./routes/policy-pages.js";
import settingsRoutes from "./routes/settings.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB Connection
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ message: "Database connection successful", data: rows });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Agora Win Admin API" });
});

// API Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/stamp-cards", stampCardRoutes);
app.use("/gift-cards", giftCardRoutes);
app.use("/policy-pages", policyPageRoutes);
app.use("/settings", settingsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
