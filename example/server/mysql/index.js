const mysql = require('mysql');
const config = require('../config');

// Creat SQL connection
const db = mysql.createConnection(config.mySQL.connection);

// Check connection
db.connect(function (error) {
  if (error) throw error;
  console.log('Connected to SQL db: ', config.mySQL.connection.database);
});

module.exports = db;