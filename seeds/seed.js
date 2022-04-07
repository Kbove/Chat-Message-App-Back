const sequelize = require('../config/connection')
const { User } = require('../models')

const seed = async () => {
    try {
        const userData = await User.bulkCreate([
            {
                username: 'Kyle',
                email: 'kbove@gmail.com',
                password: 'password'
            },
            {
                username: 'Sam',
                email: 'sam@gmail.com',
                password: 'password'
            },            
            {
                username: 'Jeff',
                email: 'jeff@gmail.com',
                password: 'password'
            },
        ], {
            individualHooks: true
        })
    } catch (err) {
        throw err
    }
}

sequelize.sync({force: true}).then(() => {
    seed()
})