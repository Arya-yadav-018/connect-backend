const express = require('express');
const {SendConnectionRequest, AcceptConnectionRequest} = require('../controllers/requestcontroller');
const isUserAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post("/send/:status/:toUserId",  isUserAuthenticated ,SendConnectionRequest);
router.post("/reviewRequest/:status/:requestId",  isUserAuthenticated , AcceptConnectionRequest);
// router.post("/ignore");
// router.post("/accept");
// router.post("/reject");

module.exports = router;



