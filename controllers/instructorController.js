const Instructor = require('../models/instructorModel');
const Specialty = require('../models/specialityModel');

// Create a new instructor
const createInstructor = async (req, res) => {
  try {
    const { biography, average_rating, user_fk, specialties } = req.body;
    const newInstructor = new Instructor({ biography, average_rating, user_fk, specialties });
    const savedInstructor = await newInstructor.save();
    res.status(201).json(savedInstructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all instructors
const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().populate('user_fk').populate('specialties');
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an instructor by ID
const getInstructorById = async (req, res) => {
  try {
    const { id } = req.body;
    const instructor = await Instructor.findById(id).populate('user_fk').populate('specialties');
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an instructor by ID
const updateInstructorById = async (req, res) => {
  try {
    const { id, biography, average_rating, user_fk, specialties } = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(id, { biography, average_rating, user_fk, specialties }, { new: true }).populate('user_fk').populate('specialties');
    if (!updatedInstructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.status(200).json(updatedInstructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an instructor by ID
const deleteInstructorById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    if (!deletedInstructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add specialties to an instructor
const addSpecialtiesToInstructor = async (req, res) => {
  try {
    const { instructorId, specialties } = req.body; // specialties es un array de IDs
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    instructor.specialties = [...new Set([...instructor.specialties, ...specialties])]; // Evita duplicados
    await instructor.save();
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a specialty from an instructor
const removeSpecialtyFromInstructor = async (req, res) => {
  try {
    const { instructorId, specialtyId } = req.body;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    instructor.specialties = instructor.specialties.filter(specialty => specialty.toString() !== specialtyId);
    await instructor.save();
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructorById,
  deleteInstructorById,
  addSpecialtiesToInstructor,
  removeSpecialtyFromInstructor
};
