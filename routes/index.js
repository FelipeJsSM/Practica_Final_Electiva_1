const express = require('express');

const ErrorController = require("../controllers/ErrorController");
const homeRoute = require('./home');
const bookRoute = require('./books');
const categoryRoute = require('./categories');
const authorRoute = require('./authors');
const editorialRoute = require('./publishers');
const router = express.Router();

router.use('/', homeRoute);
router.use('/book', bookRoute);
router.use('/category', categoryRoute);
router.use('/author', authorRoute);
router.use('/editorial', editorialRoute);

router.use('/', ErrorController.Get404);

module.exports = router;