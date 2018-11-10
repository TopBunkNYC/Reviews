const mysql = require('mysql');
const config = require('../config.js').mysqlDbConfig;

const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) {
    console.error('error: ' + err.stack);
  } else {
    console.log('connected on threadId: ' + connection.threadId);
  }
});


module.exports = connection;
