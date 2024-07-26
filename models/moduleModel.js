const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: {  
    type: String,
    required: true
  },
  video: {  // Optional
    type: String,
  },
  text: {  // Optional
    type: String,
  },
  code: {  // Optional
    type: String,
  },
  quizzes: {  // Optional
    type: String,
  },
  lesson: {  // Foreign key reference to the Lesson model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  }
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;

