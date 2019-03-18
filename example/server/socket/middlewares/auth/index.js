module.exports = function (io) {
  const cookie = require('cookie');
  const cookieParser = require('cookie-parser');

  const config = require('../../../config');
  const sessionStore = require('../session')['sessionStore'];

  const sigIn = require('./sigIn');
  const loadSession = require('./loadSession');

  io.use((socket, next) => {
    const user = require('./parseUser')(socket.handshake.query.user);

    const session = socket.request.session;
    const cookies = cookie.parse(socket.request.headers.cookie);
    const sid = cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);

    user
      ? sigIn(user, session, next)
      : sessionStore.load(sid, loadSession(next));
  });

};