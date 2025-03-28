const express = require('express');

const HomeController = require('../controllers/HomeController');
const router = express.Router();

router.get('/', HomeController.GetBooksList);
router.post('/', HomeController.PostFilterHome);
router.get('/detail/:bookId', HomeController.GetBookDetails);

module.exports = router;