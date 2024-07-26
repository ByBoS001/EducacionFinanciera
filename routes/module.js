const express = require('express');
const router = express.Router();
const {
  createModule,
  getAllModules,
  getModuleById,
  updateModuleById,
  deleteModuleById
} = require('../controllers/moduleController');

router.post('/create-module', createModule);
router.post('/get-all-modules', getAllModules);
router.post('/get-module-by-id', getModuleById);
router.post('/update-module-by-id', updateModuleById);
router.post('/delete-module-by-id', deleteModuleById);

module.exports = router;

