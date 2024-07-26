const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  max_score: {
    type: Number,
    required: true
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
