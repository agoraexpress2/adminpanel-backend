import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all gift cards
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gift_cards");

    // Transform database column names to camelCase for frontend
    const giftCards = rows.map((row) => ({
      id: row.id,
      name: row.name,
      serialNumber: row.serial_number,
      description: row.description,
      type: row.type,
      usageLimit: row.usage_limit,
      validityDays: row.validity_days,
      status: row.status,
      expiryDate: row.expiry_date,
      createdAt: row.created_at,
    }));

    res.json(giftCards);
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get gift card by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gift_cards WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    const row = rows[0];
    const giftCard = {
      id: row.id,
      name: row.name,
      serialNumber: row.serial_number,
      description: row.description,
      type: row.type,
      usageLimit: row.usage_limit,
      validityDays: row.validity_days,
      status: row.status,
      expiryDate: row.expiry_date,
      createdAt: row.created_at,
    };

    // If card is claimed, get user info
    if (row.status === "claimed" || row.status === "used") {
      const [userCards] = await pool.query(
        `SELECT uc.*, u.name, u.phone 
         FROM user_gift_cards uc 
         JOIN users u ON uc.user_id = u.id 
         WHERE uc.gift_card_id = ?`,
        [row.id],
      );

      if (userCards.length > 0) {
        const userCard = userCards[0];
        giftCard.claimedBy = {
          name: userCard.name,
          phone: userCard.phone,
          claimDate: userCard.claim_date,
        };
      }
    }

    res.json(giftCard);
  } catch (error) {
    console.error("Error fetching gift card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new gift card
router.post("/", async (req, res) => {
  try {
    const { name, serialNumber, description, type, usageLimit, validityDays } =
      req.body;

    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validityDays);

    const [result] = await pool.query(
      `INSERT INTO gift_cards 
       (name, serial_number, description, type, usage_limit, validity_days, expiry_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        serialNumber,
        description,
        type || "Standard",
        usageLimit,
        validityDays,
        expiryDate,
      ],
    );

    const newCardId = result.insertId;

    const [rows] = await pool.query("SELECT * FROM gift_cards WHERE id = ?", [
      newCardId,
    ]);

    const newCard = {
      id: rows[0].id,
      name: rows[0].name,
      serialNumber: rows[0].serial_number,
      description: rows[0].description,
      type: rows[0].type,
      usageLimit: rows[0].usage_limit,
      validityDays: rows[0].validity_days,
      status: rows[0].status,
      expiryDate: rows[0].expiry_date,
      createdAt: rows[0].created_at,
    };

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating gift card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update gift card
router.put("/:id", async (req, res) => {
  try {
    const { name, description, type, usageLimit, validityDays } = req.body;

    await pool.query(
      `UPDATE gift_cards 
       SET name = ?, description = ?, type = ?, usage_limit = ?, validity_days = ? 
       WHERE id = ?`,
      [name, description, type, usageLimit, validityDays, req.params.id],
    );

    const [rows] = await pool.query("SELECT * FROM gift_cards WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    const row = rows[0];
    const updatedCard = {
      id: row.id,
      name: row.name,
      serialNumber: row.serial_number,
      description: row.description,
      type: row.type,
      usageLimit: row.usage_limit,
      validityDays: row.validity_days,
      status: row.status,
      expiryDate: row.expiry_date,
      createdAt: row.created_at,
    };

    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating gift card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark gift card as used
router.post("/:id/use", async (req, res) => {
  try {
    // Check if card exists and is claimed
    const [cards] = await pool.query("SELECT * FROM gift_cards WHERE id = ?", [
      req.params.id,
    ]);

    if (cards.length === 0) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    const card = cards[0];

    if (card.status !== "claimed") {
      return res.status(400).json({
        message: "Gift card must be claimed before it can be used",
      });
    }

    // Update card status
    await pool.query("UPDATE gift_cards SET status = 'used' WHERE id = ?", [
      req.params.id,
    ]);

    // Update user_gift_cards record
    const [userCards] = await pool.query(
      "SELECT * FROM user_gift_cards WHERE gift_card_id = ?",
      [req.params.id],
    );

    if (userCards.length > 0) {
      await pool.query(
        "UPDATE user_gift_cards SET used_date = NOW() WHERE gift_card_id = ?",
        [req.params.id],
      );
    }

    res.json({ success: true, message: "Gift card marked as used" });
  } catch (error) {
    console.error("Error using gift card:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
