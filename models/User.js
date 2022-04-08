const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        friend_list: {
            type: Array,
            allowNull: true,
            defaultValue: []
        },
        messages: {
            type: Array,
            allowNull: true,
            defaultValue: []
        },
    }, {
        toJSON: {
            virtuals: true,
        },
    }
)

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})

UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', UserSchema)

module.exports = User