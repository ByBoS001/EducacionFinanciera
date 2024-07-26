const Achievement = require('../models/achievementModel');

// Create a new achievement
const createAchievement = async (req, res) => {
  try {
    const { course, student, name, dateAchieved } = req.body;
    const newAchievement = new Achievement({ course, student, name, dateAchieved });
    const savedAchievement = await newAchievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all achievements
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().populate('course').populate('student');
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an achievement by ID
const getAchievementById = async (req, res) => {
  try {
    const { id } = req.body;
    const achievement = await Achievement.findById(id).populate('course').populate('student');
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.status(200).json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an achievement by ID
const updateAchievementById = async (req, res) => {
  try {
    const { id, course, student, name, dateAchieved } = req.body;
    const updatedAchievement = await Achievement.findByIdAndUpdate(id, { course, student, name, dateAchieved }, { new: true }).populate('course').populate('student');
    if (!updatedAchievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.status(200).json(updatedAchievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an achievement by ID
const deleteAchievementById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedAchievement = await Achievement.findByIdAndDelete(id);
    if (!deletedAchievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievementById,
  deleteAchievementById
};
