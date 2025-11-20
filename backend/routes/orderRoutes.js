import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST new order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;