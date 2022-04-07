const router = require('express').Router()

const userRoutes = require('./userController')
const messageRoutes = require('./messageController')

router.use('/users', userRoutes)
router.use('/messages', messageRoutes)

module.exports = router