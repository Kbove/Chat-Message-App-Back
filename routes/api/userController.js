const express = require('express')
const router = express.Router()
const { User, Message } = require('../../models')
const bcrypt = require('bcrypt')
require('dotenv').config()
const auth = require('../../utils/auth')
const { authMiddleware, signToken } = require('../../utils/auth')


router.get('/', (req, res) => {
    User.findAll().then(userData => {
        res.json({userData})
    }).catch(err => {
        res.status(500).json(err)
    })
})

// router.get('/logout', (req, res) => {
//     req.session.destroy(() => {
//         res.json({message: 'Logged out'})
//     })
// })

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body)
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            res.status(401).json({message: 'Incorrect email or password'})
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.json({foundUser})
            } else {
                res.status(401).json({message: 'Incorrect email or password'})
            }
        }
        const token = signToken(foundUser);
        res.json({ token, foundUser });
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router