const mongoose = require("mongoose"); // Asegúrate de que esta línea esté presente
const Question = require("../models/questionModel");
const Lesson = require("../models/lessonModel");

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { text, lessons } = req.body;
    const newQuestion = new Question({ text, lessons });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("lessons");
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionsByLesson = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Lesson ID is required" });
    }

    const questions = await Question.find({ lessons: id }).populate("answers");

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this lesson" });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a question by ID
const updateQuestionById = async (req, res) => {
  try {
    const { id, text, lessons } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { text, lessons },
      { new: true }
    ).populate("lessons");
    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question by ID
const deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionsByLesson,
  updateQuestionById,
  deleteQuestionById,
};
