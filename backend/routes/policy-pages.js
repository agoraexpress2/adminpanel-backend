import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all policy pages
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM policy_pages");

    // Transform database column names to camelCase for frontend
    const policyPages = rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json(policyPages);
  } catch (error) {
    console.error("Error fetching policy pages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get policy page by slug
router.get("/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM policy_pages WHERE slug = ?",
      [req.params.slug],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Policy page not found" });
    }

    const row = rows[0];
    const policyPage = {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(policyPage);
  } catch (error) {
    console.error("Error fetching policy page:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update policy page
router.put("/:slug", async (req, res) => {
  try {
    const { content } = req.body;

    await pool.query("UPDATE policy_pages SET content = ? WHERE slug = ?", [
      content,
      req.params.slug,
    ]);

    const [rows] = await pool.query(
      "SELECT * FROM policy_pages WHERE slug = ?",
      [req.params.slug],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Policy page not found" });
    }

    const row = rows[0];
    const updatedPage = {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(updatedPage);
  } catch (error) {
    console.error("Error updating policy page:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
