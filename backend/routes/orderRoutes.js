// import express and order model
const express = require("express");
const Order = require("../models/Order");

// create a router object to define routes for orders
const router = express.Router();

// route to place a new order
router.post("/", async (req, res) => { // creates a new order doc in mongodb
  try {
    const newOrder = new Order(req.body); // creates a new order doc from requests body
    await newOrder.save(); // saves order to mongodb
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// export the router so it can be used in server.js
module.exports = router;