const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  course: {  // Foreign key reference to the Course
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student: {  // Foreign key reference to the Student
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dateAchieved: {
    type: Date,
    default: Date.now
  }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
