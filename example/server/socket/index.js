module.exports = function(server, {sessionMiddleware, sessionStore}) {
  const io = require('socket.io')(server);
  const event = require('./events');
  const store = require('../store');

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

    socketClient.emit(event.users, store.users);
    socketClient.emit(event.user, {id: user.id, name: user.name});

    changeUserStatus('online');

    socketClient.on(event.newMessage, message => {
      store.messages = message;
      socketClient.broadcast.emit(event.newMessage, message);
      console.log(store.messages);
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
      const userStatus = {userId: user.id, status};

      store.userStatus = userStatus;
      socketClient.broadcast.emit(event.userStatus, userStatus);
    }
  });
};