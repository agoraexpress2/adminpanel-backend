import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.*, 
        (SELECT COUNT(*) FROM user_stamp_cards WHERE user_id = u.id) as stampCards,
        (SELECT COUNT(*) FROM user_gift_cards WHERE user_id = u.id) as giftCards
      FROM users u
      ORDER BY u.name
    `);

    // Transform database column names to camelCase for frontend
    const customers = rows.map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      pin: row.pin,
      branch: row.branch,
      isActive: row.is_active === 1,
      joinDate: row.join_date,
      stampCards: row.stampCards,
      giftCards: row.giftCards,
    }));

    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get customer by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.*, 
        (SELECT COUNT(*) FROM user_stamp_cards WHERE user_id = u.id) as stampCards,
        (SELECT COUNT(*) FROM user_gift_cards WHERE user_id = u.id) as giftCards
      FROM users u
      WHERE u.id = ?`,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const row = rows[0];
    const customer = {
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      pin: row.pin,
      branch: row.branch,
      isActive: row.is_active === 1,
      joinDate: row.join_date,
      stampCards: row.stampCards,
      giftCards: row.giftCards,
    };

    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new customer
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, pin, branch, joinDate } = req.body;

    const [result] = await pool.query(
      "INSERT INTO users (name, phone, email, pin, branch, join_date) VALUES (?, ?, ?, ?, ?, ?)",
      [name || "", phone, email, pin, branch, joinDate || new Date()],
    );

    const newCustomerId = result.insertId;

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      newCustomerId,
    ]);

    const newCustomer = {
      id: rows[0].id,
      name: rows[0].name,
      phone: rows[0].phone,
      email: rows[0].email,
      pin: rows[0].pin,
      branch: rows[0].branch,
      isActive: rows[0].is_active === 1,
      joinDate: rows[0].join_date,
      stampCards: 0,
      giftCards: 0,
    };

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update customer
router.put("/:id", async (req, res) => {
  try {
    const { name, phone, email, pin, branch, isActive } = req.body;

    await pool.query(
      "UPDATE users SET name = ?, phone = ?, email = ?, pin = ?, branch = ?, is_active = ? WHERE id = ?",
      [name, phone, email, pin, branch, isActive ? 1 : 0, req.params.id],
    );

    const [rows] = await pool.query(
      `SELECT u.*, 
        (SELECT COUNT(*) FROM user_stamp_cards WHERE user_id = u.id) as stampCards,
        (SELECT COUNT(*) FROM user_gift_cards WHERE user_id = u.id) as giftCards
      FROM users u
      WHERE u.id = ?`,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const row = rows[0];
    const updatedCustomer = {
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      pin: row.pin,
      branch: row.branch,
      isActive: row.is_active === 1,
      joinDate: row.join_date,
      stampCards: row.stampCards,
      giftCards: row.giftCards,
    };

    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle customer status
router.patch("/:id/status", async (req, res) => {
  try {
    const { isActive } = req.body;

    await pool.query("UPDATE users SET is_active = ? WHERE id = ?", [
      isActive ? 1 : 0,
      req.params.id,
    ]);

    res.json({ success: true, message: "Customer status updated" });
  } catch (error) {
    console.error("Error updating customer status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
