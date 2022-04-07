const router = require('express').Router()
const { User, Message } = require('../../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { authMiddleWare, signToken } = require('../../utils')
const auth = require('../../utils/auth')

router.get('/', (req, res) => {
    User.find({}).then(userData => {
        res.json(userData)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/signup', async ({body}, res) => {
    try {
        User.create(body)
        .then(data => {
            if (!data) {
                return res.status(400).json({ message: 'Invalid inputs'})
            }
            const token = signToken(data)
            res.json({token, data})
        })
    } catch (err) {
        return res.status(400).json(err)
    }
})

router.post('/login', async ({body}, res) => {
    try {
        const user = await User.findOne({ $or: [{username: body.username}, {email: body.email}]})
        if (!user) {
            return res.status(400).json({message: 'Wrong username or password'})
        }
        const correctPw = await user.isCorrectPassword(body.password)
        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong username or password'})
        }
        const token = signToken(user)
        res.json({token, user})
    } catch (err) {
        return res.status(400).json(err)
    }
})

module.exports = router