const Sesion = require('../models/sessionModel');

// Crear una nueva sesión
const createSesion = async (req, res) => {
  try {
    const { password, last_session, session_duration, fk_user } = req.body;
    const newSesion = new Sesion({ password, last_session, session_duration, fk_user });
    const savedSesion = await newSesion.save();
    res.status(201).json(savedSesion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Leer todas las sesiones
const getAllSesions = async (req, res) => {
  try {
    const sesions = await Sesion.find().populate('fk_user');
    res.status(200).json(sesions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Leer una sesión por ID
const getSesionById = async (req, res) => {
  try {
    const { id } = req.body;
    const sesion = await Sesion.findById(id).populate('fk_user');
    if (!sesion) {
      return res.status(404).json({ error: 'Sesion not found' });
    }
    res.status(200).json(sesion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una sesión por ID
const updateSesionById = async (req, res) => {
  try {
    const { id, password, last_session, session_duration, fk_user } = req.body;
    const updatedSesion = await Sesion.findByIdAndUpdate(id, { password, last_session, session_duration, fk_user }, { new: true });
    if (!updatedSesion) {
      return res.status(404).json({ error: 'Sesion not found' });
    }
    res.status(200).json(updatedSesion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una sesión por ID
const deleteSesionById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedSesion = await Sesion.findByIdAndDelete(id);
    if (!deletedSesion) {
      return res.status(404).json({ error: 'Sesion not found' });
    }
    res.status(200).json({ message: 'Sesion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSesion,
  getAllSesions,
  getSesionById,
  updateSesionById,
  deleteSesionById
};
