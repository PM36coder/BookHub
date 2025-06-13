const express = require('express')
const {submitContact} = require('../controller/contactController')
const {authTokenMiddleware} = require('../middleware/authTokenmiddleware')

const router = express.Router()

router.post('/contact' , authTokenMiddleware, submitContact)

module.exports = router