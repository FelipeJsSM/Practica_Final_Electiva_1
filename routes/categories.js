const express = require('express');

const CategoryController = require('../controllers/CategoriesController');
const router = express.Router();

router.get('/', CategoryController.GetCategoriesList);
router.get('/create', CategoryController.GetCreateCategory);
router.post('/create', CategoryController.PostCreateCategory);
router.get('/edit/:categoryId', CategoryController.GetEditCategory);
router.post('/edit', CategoryController.PostEditCategory);
router.post('/delete/:categoryId', CategoryController.PostDeleteCategory);

module.exports = router;