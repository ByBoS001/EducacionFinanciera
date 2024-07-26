const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  biography: { 
    type: String,
    required: true
  },
  average_rating: {
    type: Number,
    required: true
  },
  user_fk: {  // referencia a la tabla users
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialties: [{  // Referencia a Specialty (relación muchos a muchos)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty'
  }]
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
