const express = require('express');
const router = express.Router();
const {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructorById,
  deleteInstructorById,
  addSpecialtiesToInstructor,
  removeSpecialtyFromInstructor
} = require('../controllers/instructorController');

router.post('/create-instructor', createInstructor);
router.post('/get-all-instructors', getAllInstructors);
router.post('/get-instructor-by-id', getInstructorById);
router.post('/update-instructor-by-id', updateInstructorById);
router.post('/delete-instructor-by-id', deleteInstructorById);
router.post('/add-specialties', addSpecialtiesToInstructor);
router.post('/remove-specialty', removeSpecialtyFromInstructor);

module.exports = router;
