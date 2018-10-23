const mysql = require('mysql');
const config = require('../config.js');

var db = mysql.createConnection(config);
db.connect((err) => {
  if (err) { return console.error('error connecting: ' + err.stack); }
  else { console.log('connected as id ' + connection.threadId); }
});