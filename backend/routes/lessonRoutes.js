import express from "express";
import Lesson from "../models/Lesson.js";

const router = express.Router();

// GET all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// UPDATE lesson spaces
router.put("/:id", async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { spaces: req.body.spaces },
      { new: true }
    );
    res.json(updatedLesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

export default router;