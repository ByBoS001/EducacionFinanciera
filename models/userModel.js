const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    trim: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
    required: true
  },
    role: {
      type: String,
      default: 'user',
  },
  verificationToken: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  
  roles: [{  // Relación muchos a muchos con Category (roles del usuario)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});



module.exports = mongoose.model('User', userSchema);
