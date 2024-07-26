const Forum = require('../models/forumModel');

// Create a new forum
const createForum = async (req, res) => {
  try {
    const { name, description, forumDate, like, solved, user } = req.body;
    const newForum = new Forum({ name, description, forumDate, like, solved, user });
    const savedForum = await newForum.save();
    res.status(201).json(savedForum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all forums
const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find().populate('user');
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a forum by ID
const getForumById = async (req, res) => {
  try {
    const { id } = req.body;
    const forum = await Forum.findById(id).populate('user');
    if (!forum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a forum by ID
const updateForumById = async (req, res) => {
  try {
    const { id, name, description, forumDate, like, solved, user } = req.body;
    const updatedForum = await Forum.findByIdAndUpdate(id, { name, description, forumDate, like, solved, user }, { new: true }).populate('user');
    if (!updatedForum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.status(200).json(updatedForum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a forum by ID
const deleteForumById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedForum = await Forum.findByIdAndDelete(id);
    if (!deletedForum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.status(200).json({ message: 'Forum deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createForum,
  getAllForums,
  getForumById,
  updateForumById,
  deleteForumById
};
