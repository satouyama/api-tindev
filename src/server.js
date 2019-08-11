const express = require('express');
const routes = require('./routes');
const path = require('path')
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const cors = require('cors');

const httpServer = express();
const server = require('http').Server(httpServer);
const io = require('socket.io')(server);



const connectedUsers = {}

io.on('connection', (socket) =>{
    const {user}  = socket.handshake.query;
console.log(user, socket.id)

connectedUsers[user] = socket.id;
})

mongoose.connect("mongodb+srv://tindev:tindev@cluster0-odmq7.mongodb.net/tindev?retryWrites=true&w=majority", {useNewUrlParser:true});


httpServer.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

httpServer.use(cors());
httpServer.use(express.json())
httpServer.use(routes);
httpServer.use(express.static(__dirname));
httpServer.use(express.static(path.join(__dirname, 'build')));

// start servidor
server.listen(port, ()=>{
 console.log(`server listening on port ${port}`);
})