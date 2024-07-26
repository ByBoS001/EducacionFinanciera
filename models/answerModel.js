const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isCorrect: {  // Indicates if the answer is correct
    type: Boolean,
    required: true
  },
  question: {  // Foreign key reference to the Question model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
