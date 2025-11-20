// models/Order.js
import mongoose from "mongoose";

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

export default mongoose.model("Order", orderSchema);