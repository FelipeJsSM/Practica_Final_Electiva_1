const express = require('express');

const BookController = require('../controllers/BooksController');
const router = express.Router();

router.get('/', BookController.GetBooksList);
router.get('/create', BookController.GetCreateBook);
router.post('/create', BookController.PostCreateBook);
router.get('/edit/:bookId', BookController.GetEditBook);
router.post('/edit', BookController.PostEditBook);
router.post('/delete/', BookController.PostDeleteBook);

module.exports = router;