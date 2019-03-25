const path = require('path');
const express = require('express');

const session = require('./middlewares/session');
const config = require('./config');

const CLIENT = path.join(__dirname, '/../client/build');
const INDEX = path.join(__dirname + '/../client/build/index.html');

const server = express().
    use(session.sessionMiddleware).
    use(express.static(CLIENT)).
    use((req, res) => res.sendFile(INDEX)).
    listen(config.port, () => console.log('Listening on:', config.port));

// Attach socket.io
require('./socket')(server, session);
