const express = require('express')
const friendController = require('../controllers/friend.controller')
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router()

router.get("/", authMiddleware, friendController.listFriends)

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