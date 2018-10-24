/* REMEMBER TO DELETE DROP DATABSE FROM SCHEMA.SQL WHEN EVERYTHING IS WORKING */

const mysql = require('mysql');
const config = require('../config.js');
// var connection = mysql.createConnection(config);
// connection.connect((err) => {
//   if (err) { return console.error('error connecting: ' + err.stack); }
//   else { console.log('connected as id ' + connection.threadId); }
// });

const knex = require('knex')({ client: 'mysql', connection: config });
const bookshelf = require('bookshelf')(knex);

var Listing = bookshelf.Model.extend({
  tableName: 'Listings'
});

var User = bookshelf.Model.extend({
  tableName: 'Users'
});

var Booking = bookshelf.Model.extend({
  tableName: 'Bookings'
});

var Review = bookshelf.Model.extend({
  tableName: 'Reviews'
});

module.exports = connection;