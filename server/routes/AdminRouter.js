const express = require('express');
const router = express.Router();
const signupAdmin = require('../controller/AdminController');
const signinAdmin = require('../controller/AdminController');

router.post('/signup', signupAdmin)
router.post('/signin', signinAdmin)

module.exports = router