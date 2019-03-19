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
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'database',
  },
};
