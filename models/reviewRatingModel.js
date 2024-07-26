const mongoose = require('mongoose');

const reviewRatingSchema = new mongoose.Schema({
  course: {  // Foreign key reference to the Course
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instructor: {  // This will be populated from the course's instructor
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  student: {  // Foreign key reference to the Student
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  comment: { 
    type: String,
    required: true
  },
  reviewDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

const ReviewRating = mongoose.model('ReviewRating', reviewRatingSchema);

module.exports = ReviewRating;
