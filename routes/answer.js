const express = require('express');
const router = express.Router();
const {
  createAnswer,
  getAllAnswers,
  getAnswersByQuestionId,
  updateAnswerById,
  deleteAnswerById
} = require('../controllers/answerController');

router.post('/createanswer', createAnswer);
router.post('/get-all-answers', getAllAnswers);
router.post('/answer/:id', getAnswersByQuestionId);
router.post('/update-answer-by-id', updateAnswerById);
router.post('/delete-answer-by-id', deleteAnswerById);

module.exports = router;
