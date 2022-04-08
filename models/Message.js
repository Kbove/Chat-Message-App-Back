const { Schema, model } = require('mongoose')

const MessageSchema = new Schema(
    {
    sender_id: {
        type: Number,
        required: true,
    },
    receiver_id: {
        type: Number,
        required: true,
    },
    date_sent: {
        type: Date,
        required: true,
        defaultValue: () => Date.now() + 7*24*60*60*1000,
    },
    content: {
        type: String,
        allowNull: false,
    },
})

const Message = model('Message', MessageSchema)

module.exports = Message
