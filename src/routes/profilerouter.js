const express = require('express');
const { EditProfile, forgotPassword, viewProfile} = require('../controllers/profilecontroller');
const isUserAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.get("/view", isUserAuthenticated, viewProfile);
router.patch("/edit", isUserAuthenticated ,EditProfile);
router.patch("/forgot-password" , forgotPassword);

module.exports = router;