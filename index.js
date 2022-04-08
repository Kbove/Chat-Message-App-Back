//Require the express moule
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')
//create a new express application
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require the http module
const http = require('http').Server(app)

// require the socket.io module
const io = require('socket.io');

const port = 3001;

const socket = io(http);
//create an event listener
app.use(routes)
//To listen to messages
socket.on('connection', (socket) => {
    console.log('user connected');
});

//wire up the server to listen to our port 500
db.once('open', () => {
    http.listen(port, () => {
        console.log('connected to port: ' + port)
    });
})
