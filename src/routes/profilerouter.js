const express = require('express');
const { EditProfile, forgotPassword, viewProfile} = require('../controllers/profilecontroller');
const isUserAuthenticated = require('../middlewares/isAuthenticated');
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/view", isUserAuthenticated, viewProfile);
router.patch(
  "/edit",
  isUserAuthenticated,
  upload.single("photo"),
  EditProfile
);
router.patch("/forgot-password" , forgotPassword);

module.exports = router;