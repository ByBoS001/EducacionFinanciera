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
} = require('../controllers/userController');

router.post('/create-user', createUser);
router.post('/get-all-users', getAllUsers);
router.post('/get-user-by-id', getUserById);
router.post('/update-user-by-id', updateUserById);
router.post('/delete-user-by-id', deleteUserById);
router.post('/add-roles', addRolesToUser);
router.post('/remove-role', removeRoleFromUser);

module.exports = router;