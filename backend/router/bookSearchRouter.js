const express = require('express');
const { searchBooks, getBookById } = require('../controller/bookController')
const { authTokenMiddleware } = require('../middleware/authTokenmiddleware')
const router = express.Router()

// Apply auth middleware to all routes
router.use(authTokenMiddleware);

router.get('/search', searchBooks)
router.get('/book/:id', getBookById)

module.exports = router
