const express = require('express')
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const friendRoutes = require('./friend.routes')

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/friends", friendRoutes)

module.exports = router