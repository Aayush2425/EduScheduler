
const express = require('express');
const router = express.Router();
const signupAdmin = require('../controller/AdminController');
const signinAdmin = require('../controller/AdminController');
const updateAdmin = require("../controller/AdminController");

router.post('/signup', signupAdmin)
router.post('/signin', signinAdmin)
router.put("/:id", updateAdmin);

module.exports = router;
