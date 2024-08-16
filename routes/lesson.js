const express = require('express');
const router = express.Router();
const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById
} = require('../controllers/lessonController');

router.post('/createlesson', createLesson);
router.post('/get-all-lessons', getAllLessons);
router.post('/get-lesson-by-id', getLessonById);
router.post('/update-lesson-by-id', updateLessonById);
router.post('/delete-lesson-by-id', deleteLessonById);

module.exports = router;
