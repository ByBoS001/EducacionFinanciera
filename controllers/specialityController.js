const Specialty = require('../models/specialityModel');

// Create a new specialty
const createSpecialty = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSpecialty = new Specialty({ name, description });
    const savedSpecialty = await newSpecialty.save();
    res.status(201).json(savedSpecialty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all specialties
const getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specialty by ID
const getSpecialtyById = async (req, res) => {
  try {
    const { id } = req.body;
    const specialty = await Specialty.findById(id);
    if (!specialty) {
      return res.status(404).json({ error: 'Specialty not found' });
    }
    res.status(200).json(specialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specialty by ID
const updateSpecialtyById = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const updatedSpecialty = await Specialty.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedSpecialty) {
      return res.status(404).json({ error: 'Specialty not found' });
    }
    res.status(200).json(updatedSpecialty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a specialty by ID
const deleteSpecialtyById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedSpecialty = await Specialty.findByIdAndDelete(id);
    if (!deletedSpecialty) {
      return res.status(404).json({ error: 'Specialty not found' });
    }
    res.status(200).json({ message: 'Specialty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialtyById,
  deleteSpecialtyById
};
