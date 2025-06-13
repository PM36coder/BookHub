const express = require("express");
const {register ,login ,} = require("../controller/userAuthcontroller")
// const authTokenMiddleware = require('../middleware/authTokenmiddleware')

const router = express.Router();

router.post('/register',register);
router.post('/login', login);
// router.get("/user", authMiddleware, user)
module.exports = router