import express from "express";
const socketIO = require('socket.io');
const io = socketIO(server);


const app = express();
const port = 9000;
app.use("/", (req, res) => {
  res.json({ message: "Hi" });
});

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

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});