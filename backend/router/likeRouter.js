const express = require('express')
const {likeToggle} = require('../controller/likeController')
const {authTokenMiddleware} = require('../middleware/authTokenmiddleware')
const router = express.Router()

router.patch('/like',authTokenMiddleware , likeToggle)

module.exports = router