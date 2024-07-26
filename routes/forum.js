const express = require('express');
const router = express.Router();
const {
  createForum,
  getAllForums,
  getForumById,
  updateForumById,
  deleteForumById
} = require('../controllers/forumController');

router.post('/create-forum', createForum);
router.post('/get-all-forums', getAllForums);
router.post('/get-forum-by-id', getForumById);
router.post('/update-forum-by-id', updateForumById);
router.post('/delete-forum-by-id', deleteForumById);

module.exports = router;
