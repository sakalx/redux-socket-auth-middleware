module.exports = function (io) {
  const sessionMiddleware = require('../session')['sessionMiddleware'];

  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });
};