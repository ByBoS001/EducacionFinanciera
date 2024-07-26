const Answer = require('../models/answerModel');

// Create a new answer
const createAnswer = async (req, res) => {
  try {
    const { name, isCorrect, question } = req.body;
    const newAnswer = new Answer({ name, isCorrect, question });
    const savedAnswer = await newAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all answers
const getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate('question');
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an answer by ID
const getAnswerById = async (req, res) => {
  try {
    const { id } = req.body;
    const answer = await Answer.findById(id).populate('question');
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an answer by ID
const updateAnswerById = async (req, res) => {
  try {
    const { id, name, isCorrect, question } = req.body;
    const updatedAnswer = await Answer.findByIdAndUpdate(id, { name, isCorrect, question }, { new: true }).populate('question');
    if (!updatedAnswer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.status(200).json(updatedAnswer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an answer by ID
const deleteAnswerById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    if (!deletedAnswer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswerById,
  deleteAnswerById
};
