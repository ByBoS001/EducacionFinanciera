const express = require('express');
const router = express.Router();
const {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById
} = require('../controllers/commentController');

router.post('/create-comment', createComment);
router.post('/get-all-comments', getAllComments);
router.post('/get-comment-by-id', getCommentById);
router.post('/update-comment-by-id', updateCommentById);
router.post('/delete-comment-by-id', deleteCommentById);

module.exports = router;
