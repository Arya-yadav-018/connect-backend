const express = require('express');
const isUserAuthenticated = require('../middlewares/isAuthenticated');
const { getAllRequests, getAllCurrentConnections, userFeed } = require('../controllers/userInteractionController');

const router = express.Router();


router.get("/AllRequests", isUserAuthenticated, getAllRequests);
router.get("/AllCurrentConnections", isUserAuthenticated, getAllCurrentConnections);
router.get("/feed", isUserAuthenticated, userFeed);

module.exports = router;