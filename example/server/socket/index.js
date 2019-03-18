module.exports = function (server) {
  const io = require('socket.io')(server);

  // Middlewares
  // Pass express session into socket.io
  require('./middlewares/session')(io);
  // Authentication before connect
  require('./middlewares/auth')(io);

  io.on('connection', (socketClient) => {
    console.log('New Socket connected', socketClient.id);

    const {session} = socketClient.request;

    socketClient.emit('user', session.user.name);

    socketClient.on('disconnect', (reason) => {
      console.warn('Socket disconnected', socketClient.id, reason);
    });

    socketClient.on('error', (error) => {
      console.warn('Socket client error :', error);
    });
  });
};