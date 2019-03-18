const mysql = require('mysql');
const config = require('../config');

// Creat SQL connection
const db = mysql.createConnection(config.mySQL);

// Check connection
db.connect(function (error) {
  if (error) throw error;
  console.log('Connected to SQL db: ', config.mySQL.database);
});

module.exports = db;