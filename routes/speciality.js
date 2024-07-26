const express = require('express');
const router = express.Router();
const {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialtyById,
  deleteSpecialtyById
} = require('../controllers/specialityController');

router.post('/create-specialty', createSpecialty);
router.post('/get-all-specialties', getAllSpecialties);
router.post('/get-specialty-by-id', getSpecialtyById);
router.post('/update-specialty-by-id', updateSpecialtyById);
router.post('/delete-specialty-by-id', deleteSpecialtyById);

module.exports = router;
