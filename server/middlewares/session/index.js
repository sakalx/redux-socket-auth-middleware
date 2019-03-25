const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const db = require('../../mysql');
const config = require('../../config');

// Create MySQL session store with connecting db
const sessionStore = new MySQLStore({}/* session store options */, db);

const sessionMiddleware = session({
  ...config.session,
  store: sessionStore,
});

module.exports = {
  sessionMiddleware,
  sessionStore,
};