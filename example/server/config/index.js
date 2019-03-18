module.exports = {
  port: 8000,
  // Session
  session: {
    secret: 'Kitty',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      path: '/',
      httpOnly: true,
      maxAge: 86400000, // 24hrs
    },
  },
  // MySQL
  mySQL: {
    host: 'db4free.net',
    port: 3306,
    user: 'sakals',
    password: '2015A0234$',
    database: 'socketio_auth',
  },
};

// Server: sql9.freemysqlhosting.net
// Name: sql9283787
// Username: sql9283787
// Password: Vwj9KpTjhz
// Port number: 3306

// host: 'db4free.net',
//   port: 3306,
//   user: 'sakals',
//   password: '2015A0234$',
//   database: 'socketio_auth',