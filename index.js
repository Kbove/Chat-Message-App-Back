const express = require('express')
const session = require('express-session')
const sequelize = require('./config/connection.js')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// const socketServer = require('./controllers/socketServer')
const { Http2ServerRequest } = require('http2')
// socketServer(io)

const PORT = process.env.PORT || 3000

const sess = {
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

sequelize.sync({force: false}).then(function() {
    server.listen(PORT, function() {
        console.log('App listen on PORT ' + PORT)
    })
})
