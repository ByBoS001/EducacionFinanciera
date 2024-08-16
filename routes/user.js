const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addRolesToUser,
  removeRoleFromUser,
  loginUser
} = require('../controllers/userController');

router.post('/register', createUser);
router.post('/get-all-users', getAllUsers);
router.post('/get-user-by-id', getUserById);
router.post('/update-user-by-id', updateUserById);
router.post('/delete-user-by-id', deleteUserById);
router.post('/add-roles', addRolesToUser);
router.post('/remove-role', removeRoleFromUser);
router.post('/login', loginUser);

module.exports = router;