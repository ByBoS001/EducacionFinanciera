const ReviewRating = require('../models/reviewRatingModel');
const Course = require('../models/courseModel');

// Create a new review and rating
const createReviewRating = async (req, res) => {
  try {
    const { course, student, comment, reviewDate, rating } = req.body;

    // Find course to get instructor
    const foundCourse = await Course.findById(course).populate('instructor');
    if (!foundCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const instructor = foundCourse.instructor._id;

    // Create new review rating
    const newReviewRating = new ReviewRating({ course, instructor, student, comment, reviewDate, rating });
    const savedReviewRating = await newReviewRating.save();
    res.status(201).json(savedReviewRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews and ratings
const getAllReviewRatings = async (req, res) => {
  try {
    const reviewRatings = await ReviewRating.find().populate('course').populate('instructor').populate('student');
    res.status(200).json(reviewRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a review and rating by ID
const getReviewRatingById = async (req, res) => {
  try {
    const { id } = req.body;
    const reviewRating = await ReviewRating.findById(id).populate('course').populate('instructor').populate('student');
    if (!reviewRating) {
      return res.status(404).json({ error: 'ReviewRating not found' });
    }
    res.status(200).json(reviewRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review and rating by ID
const updateReviewRatingById = async (req, res) => {
  try {
    const { id, course, student, comment, reviewDate, rating } = req.body;

    // Find course to get instructor
    const foundCourse = await Course.findById(course).populate('instructor');
    if (!foundCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const instructor = foundCourse.instructor._id;

    const updatedReviewRating = await ReviewRating.findByIdAndUpdate(id, { course, instructor, student, comment, reviewDate, rating }, { new: true }).populate('course').populate('instructor').populate('student');
    if (!updatedReviewRating) {
      return res.status(404).json({ error: 'ReviewRating not found' });
    }
    res.status(200).json(updatedReviewRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review and rating by ID
const deleteReviewRatingById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedReviewRating = await ReviewRating.findByIdAndDelete(id);
    if (!deletedReviewRating) {
      return res.status(404).json({ error: 'ReviewRating not found' });
    }
    res.status(200).json({ message: 'ReviewRating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReviewRating,
  getAllReviewRatings,
  getReviewRatingById,
  updateReviewRatingById,
  deleteReviewRatingById
};
