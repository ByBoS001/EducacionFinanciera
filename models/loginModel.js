const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  paswoord: {
    type: String,
    required: true,
    unique: true
  },
  
  roles: [{  // Relación muchos a muchos con Category (roles del usuario)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Login = mongoose.model('Login', loginSchemaSchema);

module.exports = Login;
