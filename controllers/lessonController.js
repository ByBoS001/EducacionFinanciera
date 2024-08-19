const Lesson = require('../models/lessonModel');

// Create a new lesson
const createLesson = async (req, res) => {
  try {
    const { name, module } = req.body;
    const newLesson = new Lesson({ name, module });
    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all lessons with populated module
const getAllLessons = async (req, res) => {
  const {id } = req.body; // Obtener el ID del módulo desde el body de la solicitud
  try {
    if (!id) {
      return res.status(400).json({ message: "Module ID is required" });
    }

    // Filtrar las lecciones que pertenecen al módulo especificado
    const lessons = await Lesson.find({ module: id }).populate('module'); // Populate the 'module' field
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: "No lessons found for this module" });
    }
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get a lesson by ID with populated module
// Obtener todas las lecciones de un módulo específico
const getLessonsByModuleId = async (req, res) => {
  try {
    // Imprime el cuerpo de la solicitud para depuración
    console.log('Request body:', req.body);

    // Extrae el ID del cuerpo de la solicitud
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Module ID is required" });
    }

    // Buscar las lecciones que pertenecen al módulo específico
    const lessons = await Lesson.find({ module: id }).populate('module');

    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: "No lessons found for this module" });
    }

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a lesson by ID
const updateLessonById = async (req, res) => {
  try {
    const { id, name, module } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(id, { name, module }, { new: true }).populate('module');
    if (!updatedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a lesson by ID
const deleteLessonById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByModuleId,
  updateLessonById,
  deleteLessonById
};
