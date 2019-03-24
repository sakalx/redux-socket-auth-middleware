const express = require('express');
const path = require('path');

const session = require('./middlewares/session');
const config = require('./config');

const PORT = process.env.PORT || config.port;
const CLIENT = path.join(__dirname, '../client/build');
const INDEX = path.join(__dirname + '../client/build/index.html');

const server = express().
    use(session.sessionMiddleware).
    use(express.static(CLIENT)).
    use((req, res) => res.sendFile(INDEX)).
    listen(PORT, () => console.log('Listening on:', PORT));

require('./socket')(server, session);