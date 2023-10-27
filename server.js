const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  userCount++;
  io.emit('userCount', userCount);

  socket.on('disconnect', () => {
    userCount--;
    io.emit('userCount', userCount);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});