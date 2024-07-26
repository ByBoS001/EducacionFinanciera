const Course = require('../models/courseModel');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, category, description, difficultyLevel, status, modules, instructor } = req.body;
    const newCourse = new Course({ title, category, description, difficultyLevel, status, modules, instructor });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category').populate('modules').populate('instructor');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.body;
    const course = await Course.findById(id).populate('category').populate('modules').populate('instructor');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a course by ID
const updateCourseById = async (req, res) => {
  try {
    const { id, title, category, description, difficultyLevel, status, modules, instructor } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, { title, category, description, difficultyLevel, status, modules, instructor }, { new: true }).populate('category').populate('modules').populate('instructor');
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a course by ID
const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById
};
