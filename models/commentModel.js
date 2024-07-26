const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  forum: {  // Foreign key reference to the Forum
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
    required: true
  },
  user: {  // Foreign key reference to the User
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentComment: {  // Reference to the parent comment (self-referencing)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
