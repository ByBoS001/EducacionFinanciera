const Comment = require('../models/commentModel');
const Forum = require('../models/forumModel');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { comment, commentDate, forum, parentComment } = req.body;

    // Find the forum to get the user
    const foundForum = await Forum.findById(forum).populate('user');
    if (!foundForum) {
      return res.status(404).json({ error: 'Forum not found' });
    }

    const user = foundForum.user._id;

    // Create a new comment
    const newComment = new Comment({ comment, commentDate, forum, user, parentComment });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('forum').populate('user').populate('parentComment');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a comment by ID
const getCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findById(id).populate('forum').populate('user').populate('parentComment');
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a comment by ID
const updateCommentById = async (req, res) => {
  try {
    const { id, comment, commentDate, forum, parentComment } = req.body;

    // Find the forum to get the user
    const foundForum = await Forum.findById(forum).populate('user');
    if (!foundForum) {
      return res.status(404).json({ error: 'Forum not found' });
    }

    const user = foundForum.user._id;

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(id, { comment, commentDate, forum, user, parentComment }, { new: true }).populate('forum').populate('user').populate('parentComment');
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment by ID
const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById
};
