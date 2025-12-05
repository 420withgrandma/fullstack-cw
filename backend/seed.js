const mongoose = require("mongoose");
const Lesson = require("./models/Lesson");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB for seeding");
    return Lesson.insertMany([
      { subject: "Math", location: "London", price: 25, spaces: 10 },
      { subject: "English", location: "Manchester", price: 20, spaces: 8 },
      { subject: "Science", location: "Birmingham", price: 30, spaces: 5 },
      { subject: "History", location: "Leeds", price: 22, spaces: 12 },
      { subject: "Art", location: "Liverpool", price: 18, spaces: 9 },
      { subject: "Music", location: "Glasgow", price: 24, spaces: 7 },
      { subject: "Computer Science", location: "London", price: 35, spaces: 6 },
      { subject: "Geography", location: "Cardiff", price: 21, spaces: 11 },
      { subject: "PE", location: "Bristol", price: 15, spaces: 20 },
      { subject: "Drama", location: "Sheffield", price: 23, spaces: 8 }
    ]);
  })
  .then(() => {
    console.log("🌱 Sample lessons inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));