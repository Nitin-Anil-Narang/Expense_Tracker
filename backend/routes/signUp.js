const express = require("express");
const router = express.Router();
const signupController = require('../controllers/signUp')

router.post('/sign-up',signupController.signup);

module.exports = router