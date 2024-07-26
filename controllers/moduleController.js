const Module = require('../models/moduleModel');

// Create a new module
const createModule = async (req, res) => {
  try {
    const { name, video, text, code, quizzes, lesson } = req.body;
    const newModule = new Module({ name, video, text, code, quizzes, lesson });
    const savedModule = await newModule.save();
    res.status(201).json(savedModule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all modules
const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate('lesson');
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a module by ID
const getModuleById = async (req, res) => {
  try {
    const { id } = req.body;
    const module = await Module.findById(id).populate('lesson');
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a module by ID
const updateModuleById = async (req, res) => {
  try {
    const { id, name, video, text, code, quizzes, lesson } = req.body;
    const updatedModule = await Module.findByIdAndUpdate(id, { name, video, text, code, quizzes, lesson }, { new: true }).populate('lesson');
    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json(updatedModule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a module by ID
const deleteModuleById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedModule = await Module.findByIdAndDelete(id);
    if (!deletedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  updateModuleById,
  deleteModuleById
};
