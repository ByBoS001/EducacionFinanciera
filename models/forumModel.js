const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  forumDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  like: {  // Optional
    type: Boolean,
    default: false
  },
  solved: {  // Boolean field indicating if the issue has been solved
    type: Boolean,
    default: false
  },
  user: {  // Foreign key reference to the User 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
