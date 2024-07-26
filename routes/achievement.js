const express = require('express');
const router = express.Router();
const {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievementById,
  deleteAchievementById
} = require('../controllers/achievementController');

router.post('/create-achievement', createAchievement);
router.post('/get-all-achievements', getAllAchievements);
router.post('/get-achievement-by-id', getAchievementById);
router.post('/update-achievement-by-id', updateAchievementById);
router.post('/delete-achievement-by-id', deleteAchievementById);

module.exports = router;
