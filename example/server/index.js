const express = require('express');
const app = express();
const server = require('http').Server(app);

const config = require('./config');

// Create session and session store
const session = require('./session');

// Middlewares
app.use(session.sessionMiddleware);

// Connect socket.io to server and session
require('./socket')(server, session);


app.get('/', (req, res) => {
  console.warn('sessionID from express', req.sessionID);
  if (req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1;
  }

  res.send('Hello world! '+req.session.views);
});

server.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});