const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const jwt = require('jsonwebtoken');


// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email, creation_date } = req.body;
    const newUser = new User({ name, email, creation_date });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Leer todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Leer un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
const updateUserById = async (req, res) => {
  try {
    const { id, name, email, creation_date } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, creation_date }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add roles to a user
const addRolesToUser = async (req, res) => {
  try {
    const { userId, roles } = req.body; // roles es un array de IDs
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.roles = [...new Set([...user.roles, ...roles])]; // Evita duplicados
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a role from a user
const removeRoleFromUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.roles = user.roles.filter(role => role.toString() !== roleId);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async(req, res) => {
  try {
      // Validaciones
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
          return sendResponse(res, 404, {}, 'Correo o contraseña incorrectos.');
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
          return sendResponse(res, 400, {}, 'Correo o contraseña incorrectos.');
      }

      const tokenExpirationSeconds = 3600; 
      const token = jwt.sign(
          { _id: user._id },
          process.env.TOKEN_SECRET,
          { expiresIn: tokenExpirationSeconds }
      );

      const expirationDate = new Date(new Date().getTime() + tokenExpirationSeconds * 1000);
      return (res, 200, { token, expiration: expirationDate.toISOString() }, 'Inicio de sesión exitoso');
  } catch (error) {
      console.error(error);
      return (res, 500, {}, 'Error interno del servidor');
  }
};



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addRolesToUser,
  removeRoleFromUser
};
