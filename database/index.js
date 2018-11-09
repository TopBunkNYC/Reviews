//////////////////////////////////////////////////////////
////////////// BEGINNING OF MYSQL VERSION ////////////////
//////////////////////////////////////////////////////////

// const mysql = require('mysql');
// const config = require('../config.js').mysqlDbConfig;

// const connection = mysql.createConnection(config);
// connection.connect((err) => {
//   if (err) {
//     console.error('error: ' + err.stack);
//   } else {
//     console.log('connected on threadId: ' + connection.threadId);
//   }
// });

//////////////////////////////////////////////////////////
///////////////// END OF MYSQL VERSION ///////////////////
///////////// BEGINNING OF POSTGRES VERSION //////////////
//////////////////////////////////////////////////////////

const pg = require('pg');
const config = require('../config.js').pgDbConfig;
const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: config.user,
    password: config.password,
    database: 'topbunk'
  }
});

module.exports = connection;
