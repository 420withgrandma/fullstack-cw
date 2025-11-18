const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  cart: [
    {
      subject: String,
      location: String,
      price: Number,
      spaces: Number
    }
  ]
});

module.exports = mongoose.model("Order", OrderSchema);

