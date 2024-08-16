const mongoose = require('mongoose');
const Module = require('../models/moduleModel');
const Lesson = require('../models/lessonModel');

const getLeccionesByModulo = async (req, res) => {
  try {
    const { moduloId } = req.params;

    // Verificar que moduloId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(moduloId)) {
      return res.status(400).json({ message: 'ID de módulo inválido' });
    }

    // Buscar el módulo
    const module = await Module.findById(moduloId);

    if (!module) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }

    // Buscar lecciones asociadas al módulo en la colección `Lesson`
    const lecciones = await Lesson.find({ moduloId: { $in: module.lessons } })
      .populate({
        path: 'questions',
        populate: {
          path: 'answers'
        }
      });

    if (lecciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron lecciones para el módulo especificado' });
    }

    // Devolver las lecciones
    res.status(200).json(lecciones);
  } catch (error) {
    console.error("Error fetching lecciones:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLeccionesByModulo
};
