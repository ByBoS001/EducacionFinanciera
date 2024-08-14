const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addRolesToUser,
  removeRoleFromUser
} = require('../controllers/loginController');

router.post('/login', createUser);


module.exports = router;