const express = require('express');
const app = express();
const server = require('http').Server(app);

const config = require('./config');

// Middlewares
app.use(require('./session')['sessionMiddleware']);

// Connect socket.io to server
require('./socket')(server);


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