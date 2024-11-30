const express = require('express');
const http = require('http');

const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connect', (socket) => {
  console.log(`user+ ${socket.id}+ 'connected' `);
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} left`);
  });
  socket.on('message', (data) => {
    console.log(`mesage sent`);
    socket.broadcast.emit('message:received', data);
  });
});

server.listen(3000, () => {
  console.log('Running on 3000');
});
