const Lesson = require('../models/lessonModel');

// Create a new lesson
const createLesson = async (req, res) => {
  try {
    const { name } = req.body;
    const newLesson = new Lesson({ name });
    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all lessons
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a lesson by ID
const getLessonById = async (req, res) => {
  try {
    const { id } = req.body;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a lesson by ID
const updateLessonById = async (req, res) => {
  try {
    const { id, name } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a lesson by ID
const deleteLessonById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById
};
