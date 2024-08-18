const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Module = require('../models/moduleModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    // Verificar si el email ya existe en la base de datos
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ message: "Este email ya ha sido registrado." });
    }

    // Crear hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crear un nuevo usuario
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    const savedUser = await user.save();
    return res
      .status(200)
      .json({ user: savedUser, message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error al guardar el usuario en la base de datos" });
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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Buscar al usuario y poblar el campo completedModules
    const user = await User.findById(id).populate('completedModules').exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Asegurarse de que completedModules esté siempre definido
    user.completedModules = user.completedModules || [];
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
const updateUserById = async (req, res) => {
  try {
    const { id, name, email, creation_date } = req.body; // Datos en el cuerpo
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, creation_date },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.body; // ID en el cuerpo
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
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
      return res.status(404).json({ error: "User not found" });
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
      return res.status(404).json({ error: "User not found" });
    }
    user.roles = user.roles.filter((role) => role.toString() !== roleId);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Validaciones
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Correo o contraseña incorrectos." });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos." });
    }

    const tokenSecret = "secret";
    const tokenExpirationSeconds = 3600;
    const token = jwt.sign({ _id: user._id }, tokenSecret, {
      expiresIn: tokenExpirationSeconds,
    });

    const expirationDate = new Date(
      new Date().getTime() + tokenExpirationSeconds * 1000
    );
    res.status(200).json({
      token: token,
      expiration: expirationDate.toISOString(),
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addRolesToUser,
  removeRoleFromUser,
  loginUser,
};
