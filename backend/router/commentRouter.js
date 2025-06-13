const express = require('express')
const router = express.Router()
const {addComment,getComment} = require('../controller/commentController')
const {authTokenMiddleware} = require('../middleware/authTokenmiddleware')

router.post('/' ,authTokenMiddleware, addComment);
router.get('/:googleId' , getComment)

module.exports = router