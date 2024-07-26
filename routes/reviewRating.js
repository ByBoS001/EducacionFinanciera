const express = require('express');
const router = express.Router();
const {
  createReviewRating,
  getAllReviewRatings,
  getReviewRatingById,
  updateReviewRatingById,
  deleteReviewRatingById
} = require('../controllers/reviewRatingController');

router.post('/create-review-rating', createReviewRating);
router.post('/get-all-review-ratings', getAllReviewRatings);
router.post('/get-review-rating-by-id', getReviewRatingById);
router.post('/update-review-rating-by-id', updateReviewRatingById);
router.post('/delete-review-rating-by-id', deleteReviewRatingById);

module.exports = router;
