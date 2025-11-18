const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  spaces: { type: Number, required: true }
});

module.exports = mongoose.model("Lesson", LessonSchema);

