const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  category: {  // Foreign key reference to the Category
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {  
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true
  },
  modules: [{  // Foreign key reference to the Module
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  }],
  instructor: {  // Foreign key reference to the Instructor
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
