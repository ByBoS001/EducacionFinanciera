const express = require('express');
const router = express.Router();
const {
  createSesion,
  getAllSesions,
  getSesionById,
  updateSesionById,
  deleteSesionById
} = require('../controllers/sessionController');

router.post('/create-sesion', createSesion);
router.post('/get-all-sesions', getAllSesions);
router.post('/get-sesion-by-id', getSesionById);
router.post('/update-sesion-by-id', updateSesionById);
router.post('/delete-sesion-by-id', deleteSesionById);

module.exports = router;
