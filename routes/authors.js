const express = require('express');

const AuthorController = require('../controllers/AuthorsController');
const router = express.Router();

router.get('/', AuthorController.GetAuthorsList);
router.get('/create', AuthorController.GetCreateAuthor);
router.post('/create', AuthorController.PostCreateAuthor);
router.get('/edit/:authorId', AuthorController.GetEditAuthor);
router.post('/edit', AuthorController.PostEditAuthor);
router.post('/delete/:authorId', AuthorController.PostDeleteAuthor);

module.exports = router;