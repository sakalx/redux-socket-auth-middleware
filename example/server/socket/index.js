module.exports = function(server, {sessionMiddleware, sessionStore}) {
  const io = require('socket.io')(server);
  const event = require('./events');
  const userStore = require('../store')['userStore'];

  // Middlewares
  // Initialization data
  require('./middlewares/initialization')();
  // Pass express sessionMiddleware into socket.io
  require('./middlewares/session')(io, sessionMiddleware);
  // Authentication before connect
  require('./middlewares/auth')(io, sessionStore);

  // Socket
  io.on('connection', (socketClient) => {
    console.log('New Socket connected', socketClient.id);
    const {session} = socketClient.request;
    const {user} = session;

    changeUserStatus('online');

    socketClient.emit(event.user, {id: user.id, name: user.name});

    socketClient.on(event.newMessage, message => {
      socketClient.broadcast.emit(event.newMessage, message);
    });

    socketClient.on(event.sigOut, () => {
      changeUserStatus('offline');
      socketClient.disconnect();
      session.destroy();
    });

    socketClient.on('disconnect', (reason) => {
      changeUserStatus('offline');
      console.warn('Socket disconnected', socketClient.id, reason);
    });

    socketClient.on('error', (error) => {
      console.warn('Socket client error :', error);
    });

    function changeUserStatus(status) {
      userStore[user.id].status = status;
      socketClient.emit(event.users, userStore);
    }
  });
};