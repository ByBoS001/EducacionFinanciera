const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
  getQuestionsByLessonId
} = require('../controllers/questionController');

router.post('/createquestion', createQuestion);
router.post('/get-all-questions', getAllQuestions);
router.post('/get-question-by-id', getQuestionById);
router.post('/get-question-by-id', getQuestionsByLessonId);
router.post('/update-question-by-id', updateQuestionById);
router.post('/delete-question-by-id', deleteQuestionById);

module.exports = router;
