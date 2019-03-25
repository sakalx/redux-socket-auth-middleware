const url = require('url');

// TODO HEROKU
// Add remote database to the Heroku configuration file
// heroku config:add DATABASE_URL=mysql2://username:password@ip.goes.here:port.here/data_base_name --app heroku-app-name

// Add session secret into Heroku
// heroku config:add SESSION_SECRET=session_secret --app heroku-app-name

const mySql = url.parse(process.env.DATABASE_URL);
const DB_HOST = mySql.hostname;
const DB_PORT = mySql.port;
const [DB_USER, DB_PASS] = mySql.auth.split(':');
const DB_NAME = mySql.path.slice(1);

module.exports = {
  port: process.env.PORT || 8000,
  // Session
  session: {
    secret: process.env.SESSION_SECRET || 'kitty',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      path: '/',
      httpOnly: true,
      maxAge: 86400000, // 24hrs
    },
  },
  // MySQL
  mySQL: {
    connection: {
      host: DB_HOST, // localhost
      port: DB_PORT, // 3306
      user: DB_USER, // username
      password: DB_PASS, // password
      database: DB_NAME, //database_name
    },
    table: {
      users: 'users',
    },
  },
};