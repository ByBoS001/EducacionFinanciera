const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionsByLesson,
  updateQuestionById,
  deleteQuestionById,
  
} = require('../controllers/questionController');

router.post('/createquestion', createQuestion);
router.post('/get-all-questions', getAllQuestions);
router.post('/question/:id', getQuestionsByLesson);
router.post('/update-question-by-id', updateQuestionById);
router.post('/delete-question-by-id', deleteQuestionById);

module.exports = router;
