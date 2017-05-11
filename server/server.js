const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'frank',
    text: 'hey pup!'
  });

  socket.on('createMessage', (newMessage) => {
    console.log('new message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(port, () => {
  console.log('server is up on ' + port );
});
