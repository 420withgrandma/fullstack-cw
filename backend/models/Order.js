// import the mongoose library to interact with mongodb
const mongoose = require("mongoose");

// define a schema for the order collection
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  cart: [
    {
      lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
      subject: String,
      location: String,
      price: Number,
      qty: Number
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// exports the schema as a model called 'order'
module.exports = mongoose.model("Order", orderSchema);

