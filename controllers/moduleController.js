const Module = require("../models/moduleModel");
const Lesson = require("../models/lessonModel");
const Question = require("../models/questionModel"); // Asegúrate de importar este modelo si necesitas usarlo
const Answer = require("../models/answerModel"); // Asegúrate de que este modelo esté correctamente definido e importado

// Create a new module
const createModule = async (req, res) => {
  try {
    const { name, video, text, code, quizzes, lessons } = req.body;

    // Verifica si todas las lecciones proporcionadas existen
    if (Array.isArray(lessons)) {
      const existingLessons = await Lesson.find({ _id: { $in: lessons } });
      if (existingLessons.length !== lessons.length) {
        return res.status(400).json({ error: "Some lesson IDs are invalid" });
      }
    }

    const newModule = new Module({ name, video, text, code, quizzes, lessons });
    const savedModule = await newModule.save();

    // Obtener el módulo guardado y hacer populate
    const populatedModule = await Module.findById(savedModule._id).populate({
      path: "lessons",
      populate: {
        path: "questions",
        populate: {
          path: "answers",
        },
      },
    });
    res.status(201).json(populatedModule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate({
      path: "lessons",
      populate: {
        path: "questions",
        populate: {
          path: "answers",
        },
      },
    });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a module by ID
const getModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findById(id).populate({
      path: "lessons",
      populate: {
        path: "questions",
        populate: {
          path: "answers",
        },
      },
    });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a module by ID
const updateModuleById = async (req, res) => {
  try {
    const { id, name, video, text, code, quizzes, lessons } = req.body;

    // Verifica si todas las lecciones proporcionadas existen
    if (lessons) {
      if (Array.isArray(lessons)) {
        const existingLessons = await Lesson.find({ _id: { $in: lessons } });
        if (existingLessons.length !== lessons.length) {
          return res.status(400).json({ error: "Some lesson IDs are invalid" });
        }
      }
    }

    const updatedModule = await Module.findByIdAndUpdate(
      id,
      { name, video, text, code, quizzes, lessons },
      { new: true }
    ).populate({
      path: "lessons",
      populate: {
        path: "questions",
        populate: {
          path: "answers",
        },
      },
    });
    if (!updatedModule) {
      return res.status(404).json({ error: "Module not found" });
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
      return res.status(404).json({ error: "Module not found" });
    }
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  updateModuleById,
  deleteModuleById,
};
