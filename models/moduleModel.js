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
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;

