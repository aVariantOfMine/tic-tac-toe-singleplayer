const express = require('express');
const app = express();

const path = require('path');

const http = require('http');
const server = http.createServer(app);

const socketIO = require('socket.io');
// const io = socketIO(server);

const io = require("socket.io")(server, {
  transports: ["polling", "websocket"], // Use polling instead of WebSockets
  cors: {
    origin: "https://vercel-demo-pio2.vercel.app/", // Adjust to match your client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-client-id"],
    credentials: true
  }
});

app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/client.html');
    // res.send('<h1>hello</h1>');
})

io.on('connection',(socket)=>{
    console.log('a player connected');
    socket.on('disconnect', ()=>{
        console.log('player disconnected');
    })

    socket.on('player name', (name)=>{
        io.emit('pn', name);
    })
    socket.on('player selected', obj =>{
        // io.emit('ps',obj);
        socket.broadcast.emit('ps',obj);
    })
    socket.on('game reset',()=>{
        socket.broadcast.emit('gr');
    })
})

server.listen(8000 , ()=>{
    console.log('game running on 8000');
})