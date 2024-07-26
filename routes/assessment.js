const express = require('express');
const router = express.Router();
const {
  createAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessmentById,
  deleteAssessmentById
} = require('../controllers/assessmentController');

router.post('/create-assessment', createAssessment);
router.post('/get-all-assessments', getAllAssessments);
router.post('/get-assessment-by-id', getAssessmentById);
router.post('/update-assessment-by-id', updateAssessmentById);
router.post('/delete-assessment-by-id', deleteAssessmentById);

module.exports = router;
