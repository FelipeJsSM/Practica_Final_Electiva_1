const express = require('express');

const EditorialController = require('../controllers/PublishersController');
const router = express.Router();

router.get('/', EditorialController.GetPublishersList);
router.get('/create', EditorialController.GetCreateEditorial);
router.post('/create', EditorialController.PostCreateEditorial);
router.get('/edit/:editorialId', EditorialController.GetEditEditorial);
router.post('/edit', EditorialController.PostEditEditorial);
router.post('/delete/:editorialId', EditorialController.PostDeleteEditorial);

module.exports = router;