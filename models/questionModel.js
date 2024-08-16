  const mongoose = require('mongoose');

  const questionSchema = new mongoose.Schema({
    text: {  // Text of the question
      type: String,
      required: true
    },
    lessons: [{  
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }]
  });

  const Question = mongoose.model('Question', questionSchema);

  module.exports = Question;
