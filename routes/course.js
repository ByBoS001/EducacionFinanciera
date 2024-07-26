const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById
} = require('../controllers/courseController');

router.post('/create-course', createCourse);
router.post('/get-all-courses', getAllCourses);
router.post('/get-course-by-id', getCourseById);
router.post('/update-course-by-id', updateCourseById);
router.post('/delete-course-by-id', deleteCourseById);

module.exports = router;
