const express = require('express')
const friendController = require('../controllers/friend.controller')
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router()

router.get("/", authMiddleware, friendController.listFriends)
router.get("/request", authMiddleware, friendController.listRequests)
router.get("/requests", authMiddleware, friendController.listRequests)

router.post("/find-request", authMiddleware, friendController.findFriendRequest)
router.post(
    "/request",
    authMiddleware,
    friendController.sendFriendRequest)

router.patch(
    "/request/:id",
    authMiddleware,
    friendController.updateFriendRequestStatus
);


module.exports = router