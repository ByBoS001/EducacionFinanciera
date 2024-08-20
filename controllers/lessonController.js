const Lesson = require("../models/lessonModel");

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
  const { id } = req.body; // Obtener el ID del módulo desde el cuerpo de la solicitud

  try {
    // Verificar si el ID está presente en el cuerpo de la solicitud
    if (!id) {
      return res.status(400).json({ message: "Module ID is required" });
    }

    // Filtrar las lecciones que pertenecen al módulo especificado
    const lessons = await Lesson.find({ module: id }).populate("module"); // Asegúrate de que 'module' es el campo correcto para hacer populate

    // Verificar si se encontraron lecciones
    if (!lessons || lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons found for this module" });
    }

    // Enviar las lecciones encontradas en la respuesta
    res.status(200).json(lessons);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};

const getLessonsByModuleId = async (req, res) => {
  try {
    console.log("Request params:", req.params); // Imprime los parámetros de la solicitud
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Module ID is required" });
    }

    // Verifica que la consulta esté correcta
    const lessons = await Lesson.find({ module: id }).populate("module");

    console.log("Lessons found:", lessons); // Imprime las lecciones encontradas

    if (!lessons || lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons found for this module" });
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
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { name, module },
      { new: true }
    ).populate("module");
    if (!updatedLesson) {
      return res.status(404).json({ error: "Lesson not found" });
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
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByModuleId,
  updateLessonById,
  deleteLessonById,
};
