const InterestArea = require('../models/interestAreaModel');

// Create a new interest area
const createInterestArea = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newInterestArea = new InterestArea({ name, description });
    const savedInterestArea = await newInterestArea.save();
    res.status(201).json(savedInterestArea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all interest areas
const getAllInterestAreas = async (req, res) => {
  try {
    const interestAreas = await InterestArea.find();
    res.status(200).json(interestAreas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an interest area by ID
const getInterestAreaById = async (req, res) => {
  try {
    const { id } = req.body;
    const interestArea = await InterestArea.findById(id);
    if (!interestArea) {
      return res.status(404).json({ error: 'Interest area not found' });
    }
    res.status(200).json(interestArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an interest area by ID
const updateInterestAreaById = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const updatedInterestArea = await InterestArea.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedInterestArea) {
      return res.status(404).json({ error: 'Interest area not found' });
    }
    res.status(200).json(updatedInterestArea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an interest area by ID
const deleteInterestAreaById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedInterestArea = await InterestArea.findByIdAndDelete(id);
    if (!deletedInterestArea) {
      return res.status(404).json({ error: 'Interest area not found' });
    }
    res.status(200).json({ message: 'Interest area deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInterestArea,
  getAllInterestAreas,
  getInterestAreaById,
  updateInterestAreaById,
  deleteInterestAreaById
};
