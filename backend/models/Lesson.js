// import the mongoose library to interact with mongodb
const mongoose = require("mongoose");

// defines a schema for the lesson collection
const lessonSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  spaces: { type: Number, required: true },
});

// exports the schema as a model called 'lesson'
module.exports = mongoose.model("Lesson", lessonSchema);
