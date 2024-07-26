const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
} = require('../controllers/categoryController');

router.post('/create-category', createCategory);
router.post('/get-all-categories', getAllCategories);
router.post('/get-category-by-id', getCategoryById);
router.post('/update-category-by-id', updateCategoryById);
router.post('/delete-category-by-id', deleteCategoryById);

module.exports = router;
