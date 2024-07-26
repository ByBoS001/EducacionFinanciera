const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_level: {
    type: String,
    required: true
  },
  user_fk: {  // referencia a la tabla users
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  interest_areas: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterestArea'
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
