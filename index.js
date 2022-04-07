const express = require('express')
const sequelize = require('./config/connection.js')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// const socketServer = require('./controllers/socketServer')
const { Http2ServerRequest } = require('http2')
// socketServer(io)

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

sequelize.sync({force: false}).then(function() {
    server.listen(PORT, function() {
        console.log('App listen on PORT ' + PORT)
    })
})
