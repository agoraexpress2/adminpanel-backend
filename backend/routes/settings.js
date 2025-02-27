import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get business settings
router.get("/business", async (req, res) => {
  try {
    // In a real app, you would store these in a settings table
    // For demo, we'll return hardcoded values
    const settings = {
      businessName: "Agora Win",
      phone: "+966 50 123 4567",
      email: "info@agorawin.com",
      address: "123 Main St, Riyadh, Saudi Arabia",
      stampSettings: {
        stampsRequired: 10,
        expiryEnabled: true,
        expiryDays: 90,
      },
      giftSettings: {
        minAmount: 10,
        maxAmount: 500,
        digitalEnabled: true,
      },
      notificationSettings: {
        emailEnabled: true,
        smsEnabled: true,
        lowBalanceAlerts: true,
      },
    };

    res.json(settings);
  } catch (error) {
    console.error("Error fetching business settings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update business settings
router.put("/business", async (req, res) => {
  try {
    const settings = req.body;

    // In a real app, you would update these in a settings table
    // For demo, we'll just return the updated settings

    res.json({
      ...settings,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating business settings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
