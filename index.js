const path = require('path');
const express = require('express');
const app = express();

// configuracion

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, 'public')))
const server = app.listen(app.get('port'),()=>{
    console.log("server on port", app.get('port'))
})

//websocket
const socketIo = require('socket.io') 
const io = socketIo(server);

io.on('connection',(socket)=>{
    console.log('new conection success', socket.id)
    socket.on('chat:io', (data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('escribiendo', (data)=>{
        socket.broadcast.emit('escribiendo', data)
    });
})