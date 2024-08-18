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
    trim: true
  },  
  creation_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  completedModules: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Module'
  }],
  lastLoginDate: {
    type: Date
  },
  roles: [{  // Relación muchos a muchos con Category (roles del usuario)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
