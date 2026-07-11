const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const messages = [];

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  messages.forEach(msg => socket.emit('chat', msg));
  console.log('user connected:', socket.id);

  socket.on('chat', (message) => {
    messages.push(message);

    io.emit('chat', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});