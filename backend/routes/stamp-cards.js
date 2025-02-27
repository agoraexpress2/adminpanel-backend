import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all stamp cards
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM stamp_cards");

    // Transform database column names to camelCase for frontend
    const stampCards = rows.map((row) => ({
      id: row.id,
      name: row.name,
      serialNumber: row.serial_number,
      description: row.description,
      image: row.image_url,
      totalStamps: row.total_stamps,
      status: row.status,
      createdAt: row.created_at,
    }));

    res.json(stampCards);
  } catch (error) {
    console.error("Error fetching stamp cards:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get stamp card by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM stamp_cards WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Stamp card not found" });
    }

    const row = rows[0];
    const stampCard = {
      id: row.id,
      name: row.name,
      serialNumber: row.serial_number,
      description: row.description,
      image: row.image_url,
      totalStamps: row.total_stamps,
      status: row.status,
      createdAt: row.created_at,
    };

    res.json(stampCard);
  } catch (error) {
    console.error("Error fetching stamp card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new stamp card
router.post("/", async (req, res) => {
  try {
    const { name, serialNumber, description, image, totalStamps } = req.body;

    const [result] = await pool.query(
      "INSERT INTO stamp_cards (name, serial_number, description, image_url, total_stamps) VALUES (?, ?, ?, ?, ?)",
      [name, serialNumber, description, image, totalStamps],
    );

    const newCardId = result.insertId;

    const [rows] = await pool.query("SELECT * FROM stamp_cards WHERE id = ?", [
      newCardId,
    ]);

    const newCard = {
      id: rows[0].id,
      name: rows[0].name,
      serialNumber: rows[0].serial_number,
      description: rows[0].description,
      image: rows[0].image_url,
      totalStamps: rows[0].total_stamps,
      status: rows[0].status,
      createdAt: rows[0].created_at,
    };

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating stamp card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update stamp card
router.put("/:id", async (req, res) => {
  try {
    const { name, description, image, totalStamps } = req.body;

    await pool.query(
      "UPDATE stamp_cards SET name = ?, description = ?, image_url = ?, total_stamps = ? WHERE id = ?",
      [name, description, image, totalStamps, req.params.id],
    );

    const [rows] = await pool.query("SELECT * FROM stamp_cards WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Stamp card not found" });
    }

    const row = rows[0];
    const updatedCard = {
      id: row.id,
      name: row.name,
      serialNumber: row.serial_number,
      description: row.description,
      image: row.image_url,
      totalStamps: row.total_stamps,
      status: row.status,
      createdAt: row.created_at,
    };

    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating stamp card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete stamp card
router.delete("/:id", async (req, res) => {
  try {
    // Check if card is in use
    const [userCards] = await pool.query(
      "SELECT * FROM user_stamp_cards WHERE stamp_card_id = ?",
      [req.params.id],
    );

    if (userCards.length > 0) {
      return res.status(400).json({
        message: "Cannot delete card that is in use by customers",
      });
    }

    await pool.query("DELETE FROM stamp_cards WHERE id = ?", [req.params.id]);

    res.json({ success: true, message: "Stamp card deleted successfully" });
  } catch (error) {
    console.error("Error deleting stamp card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add stamp to user's card
router.post("/:id/stamps", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if user has this card
    const [userCards] = await pool.query(
      "SELECT * FROM user_stamp_cards WHERE user_id = ? AND stamp_card_id = ?",
      [userId, req.params.id],
    );

    if (userCards.length === 0) {
      // User doesn't have this card yet, create it
      await pool.query(
        "INSERT INTO user_stamp_cards (user_id, stamp_card_id, current_stamps) VALUES (?, ?, 1)",
        [userId, req.params.id],
      );
    } else {
      // User already has this card, increment stamps
      const userCard = userCards[0];

      // Get card details to check total stamps
      const [cards] = await pool.query(
        "SELECT * FROM stamp_cards WHERE id = ?",
        [req.params.id],
      );

      if (cards.length === 0) {
        return res.status(404).json({ message: "Stamp card not found" });
      }

      const card = cards[0];
      const newStampCount = Math.min(
        userCard.current_stamps + 1,
        card.total_stamps,
      );

      await pool.query(
        "UPDATE user_stamp_cards SET current_stamps = ? WHERE id = ?",
        [newStampCount, userCard.id],
      );
    }

    res.json({ success: true, message: "Stamp added successfully" });
  } catch (error) {
    console.error("Error adding stamp:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
