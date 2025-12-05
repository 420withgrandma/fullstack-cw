// import express and the Lesson model
const express = require("express");
const Lesson = require("../models/Lesson"); // model import

// router object to define routes for lessons
const router = express.Router();

console.log("✅ lessonRoutes loaded");

// route to fetch all lessons from the database
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find(); // finds all lessons in mongodb
    res.json(lessons); // sends lessons as json response
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// route to update available spaces for a lesson
router.put("/:id", async (req, res) => {
  try {
    const { spaces } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id, // lesson id from url
      { spaces }, // update spaces field
      { new: true } // return updated doc
    );
    if (!updatedLesson) { // send back updated lesson
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(updatedLesson);
  } catch (err) {
    console.error("Error updating lesson:", err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

// export the router to be used in server.js
module.exports = router;