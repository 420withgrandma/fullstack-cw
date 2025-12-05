const express = require("express");
const Lesson = require("../models/Lesson"); // model import

const router = express.Router();

console.log("✅ lessonRoutes loaded");

router.get("/ping", (req, res) => {
  res.send("pong from lessonRoutes!");
});

router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { spaces } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { spaces },
      { new: true } // return updated doc
    );
    if (!updatedLesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(updatedLesson);
  } catch (err) {
    console.error("Error updating lesson:", err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

module.exports = router;