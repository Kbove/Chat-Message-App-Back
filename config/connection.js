const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/chat-message-app',
    {
        // userNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    }
)

module.exports = mongoose.connection