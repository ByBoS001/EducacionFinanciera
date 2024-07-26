const express = require('express');
const router = express.Router();
const {
  createInterestArea,
  getAllInterestAreas,
  getInterestAreaById,
  updateInterestAreaById,
  deleteInterestAreaById
} = require('../controllers/interestAreaController');

router.post('/create-interest-area', createInterestArea);
router.post('/get-all-interest-areas', getAllInterestAreas);
router.post('/get-interest-area-by-id', getInterestAreaById);
router.post('/update-interest-area-by-id', updateInterestAreaById);
router.post('/delete-interest-area-by-id', deleteInterestAreaById);

module.exports = router;
