/* REMEMBER TO DELETE DROP DATABSE FROM SCHEMA.SQL WHEN EVERYTHING IS WORKING */
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) {
    console.error('error: ' + err.stack);
  } else {
    console.log('connected: ' + connection.threadId);
  }
});

module.exports = connection;
