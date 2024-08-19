const express = require('express');
const router = express.Router();
const {
  createLesson,
  getAllLessons,
  getLessonsByModuleId,
  updateLessonById,
  deleteLessonById
} = require('../controllers/lessonController');

router.post('/createlesson', createLesson);
router.post('/get-all-lessons', getLessonsByModuleId);
router.post('/lesson/:id', getAllLessons);
router.post('/update-lesson-by-id', updateLessonById);
router.post('/delete-lesson-by-id', deleteLessonById);

module.exports = router;
