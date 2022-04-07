const { User } = require('../models')
const { signToken } = require('../utils/auth')

module.exports = {
    async createUser(req, res) {
        const user = await User.create(req.body)

        if (!user) {
            return res.status(400).json({message: 'Something went wrong'})
        }
        const token = signToken(user)
        res.json({token, user})
    }
}