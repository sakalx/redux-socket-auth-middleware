module.exports = function(io, sessionMiddleware) {
  io.use((socket, next) =>
      sessionMiddleware(socket.request, socket.request.res, next),
  );
};