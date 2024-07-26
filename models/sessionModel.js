const mongoose = require('mongoose');

const sesionSchema = new mongoose.Schema({
  password: { 
    type: String,
    required: true
  },
  last_session: { 
    type: Date,
    required: true
  },
  session_duration: {
    type: Number,
    required: true
  },
  fk_user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Sesion = mongoose.model('Sesion', sesionSchema);

module.exports = Sesion;
