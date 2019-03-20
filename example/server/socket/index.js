module.exports = function(server, {sessionMiddleware, sessionStore}) {
  const io = require('socket.io')(server);
  const event = require('./events');

  // Middlewares
  // Pass express sessionMiddleware into socket.io
  io.use((socket, next) =>
      sessionMiddleware(socket.request, socket.request.res, next),
  );

  // Authentication before connect
  require('./middlewares/auth')(io, sessionStore);

  io.on('connection', (socketClient) => {
    console.log('New Socket connected', socketClient.id);
    const {session} = socketClient.request;

    socketClient.emit(event.user, {id: session.user.id, name: session.user.name});

    socketClient.on(event.newMessage, message => {
      socketClient.broadcast.emit(event.newMessage, message);
    });

    socketClient.on(event.sigOut, () => {
      socketClient.disconnect();
      session.destroy();
    });

    socketClient.on('disconnect', (reason) => {
      console.warn('Socket disconnected', socketClient.id, reason);
    });

    socketClient.on('error', (error) => {
      console.warn('Socket client error :', error);
    });
  });
};