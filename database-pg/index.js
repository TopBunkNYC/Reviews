const pg = require('pg');
const config = require('../config.js').pgDbConfig;
const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
    user: config.user,
    password: config.password,
    database: 'topbunk'
  }
});

module.exports = connection;
