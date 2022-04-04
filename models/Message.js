const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false, 
        autoIncrement: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    date_sent: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
})

module.exports = Message
