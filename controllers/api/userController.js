const express = require('express')
const router = express.Router()
const { User, Message } = require('../../models')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    User.findAll().then(userData => {
        res.json({userData})
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('logout', (req, res) => {
    req.session.destroy(() => {
        res.json({message: 'Logged out'})
    })
})

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(newUser => {
        req.session.user = {
            username: newUser.username,
            email: newUser.email,
            id: newUser.id
        }
        res.json({newUser})
    }).catch(err => [
        res.status(500).json({ message: 'User creation failed', err: err})
    ])
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            req.session.destroy()
            res.status(401).json({message: 'Incorrect email or password'})
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.user = {
                    username: foundUser.username,
                    email: foundUser.email,
                    id: foundUser.id
                }
                res.json({foundUser})
            } else {
                req.session.destroy()
                res.status(401).json({message: 'Incorrect email or password'})
            }
        }
    }).catch(err => {
        res.status(500).json(err)
    })
})

