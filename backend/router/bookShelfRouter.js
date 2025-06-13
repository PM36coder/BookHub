const express = require('express');
const router = express.Router()

const { toggleBookshelf, getBookshelf } = require("../controller/bookShelfController");
const {authTokenMiddleware} = require("../middleware/authTokenmiddleware");

router.post("/save-book", authTokenMiddleware, toggleBookshelf);
router.get("/get-books", authTokenMiddleware, getBookshelf);

module.exports = router