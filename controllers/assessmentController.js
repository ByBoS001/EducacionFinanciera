const Assessment = require('../models/assessmentModel');

// Crear una nueva evaluación
const createAssessment = async (req, res) => {
  try {
    const { type, date, max_score } = req.body;
    const newAssessment = new Assessment({ type, date, max_score });
    const savedAssessment = await newAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Leer todas las evaluaciones
const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Leer una evaluación por ID
const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.body;
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una evaluación por ID
const updateAssessmentById = async (req, res) => {
  try {
    const { id, type, date, max_score } = req.body;
    const updatedAssessment = await Assessment.findByIdAndUpdate(id, { type, date, max_score }, { new: true });
    if (!updatedAssessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json(updatedAssessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una evaluación por ID
const deleteAssessmentById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedAssessment = await Assessment.findByIdAndDelete(id);
    if (!deletedAssessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessmentById,
  deleteAssessmentById
};
