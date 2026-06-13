const express = require('express');
const { signup, login, logout } = require('../controllers/usercontroller');
const { signupValidators } = require('../utils/validation');

const router = express.Router();

router.post("/signup", signupValidators ,signup);
router.post("/login", login)
router.post("/logout", logout);


module.exports = router;