const mongoose = require('mongoose');

const interestAreaSchema = new mongoose.Schema({
  name: {  // Nombre
    type: String,
    required: true
  },
  description: {  // Descripción
    type: String,
    required: true
  }
});

const InterestArea = mongoose.model('InterestArea', interestAreaSchema);

module.exports = InterestArea;
