const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addInterestAreasToStudent,
  removeInterestAreaFromStudent
} = require('../controllers/studentController');

router.post('/create-student', createStudent);
router.post('/get-all-students', getAllStudents);
router.post('/get-student-by-id', getStudentById);
router.post('/update-student-by-id', updateStudentById);
router.post('/delete-student-by-id', deleteStudentById);
router.post('/add-interest-areas', addInterestAreasToStudent);
router.post('/remove-interest-area', removeInterestAreaFromStudent);

module.exports = router;