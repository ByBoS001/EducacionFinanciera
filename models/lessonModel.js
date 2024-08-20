const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }, 
},{
  strictPopulate: false,  // Permite poblar campos que no están en el esquema
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
