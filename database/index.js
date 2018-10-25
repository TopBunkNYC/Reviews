/* REMEMBER TO DELETE DROP DATABSE FROM SCHEMA.SQL WHEN EVERYTHING IS WORKING */
const mysql = require('mysql');
const config = require('../config.js')

const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) { console.error('error connecting: ' + err.stack); }
  else { console.log('connected as id ' + connection.threadId); }
});

module.exports = connection;