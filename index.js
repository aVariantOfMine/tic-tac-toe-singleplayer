const express = require('express');
const app = express();

app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
    // res.send('<h1>hello</h1>');
})

server.listen(8000 , ()=>{
    console.log('game running on 8000');
})