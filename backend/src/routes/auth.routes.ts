const express = require('express')
const authController = require('../controllers/auth.controller');
const registerMiddleware = require('../middlewares/register.middleware')

const router = express.Router()

router.post("/register", registerMiddleware, authController.register)
router.post("/login", () => {})

module.exports = router