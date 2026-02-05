const express = require('express')
const messageController = require('../controllers/message.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router()

router.get("/:id", authMiddleware, messageController.getMessages)

module.exports = router