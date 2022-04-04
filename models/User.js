const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len:[8]
        }
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    friend_list: {
        type: DataTypes.ARRAY,
        allowNull: true,
        defaultValue: []
    },
    messages: {
        type: DataTypes.ARRAY,
        allowNull: true,
        defaultValue: []
    },
}, {
    hooks: {
        beforeCreate(newUser) {
            newUser.username = newUser.username.toLowerCase()
            newUser.password = bcrypt.hashSync(newUser.password,7)
            return newUser
        },
        beforeUpdate(updatedUser) {
            updatedUser.username = updatedUser.username.toLowerCase()
            updatedUser.username = bcrypt.hashSync(updatedUser.password, 7)
            return updatedUser
        }
    },
    sequelize,
})

module.exports = User