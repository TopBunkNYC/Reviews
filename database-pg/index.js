const pg = require('pg');
const configUser = process.env.dbUser || require('../config.js').pgDbConfig.user;
const configPassword = process.env.dbPassword || require('../config.js').pgDbConfig.password;
const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
    host: '18.221.51.166',
    user: configUser,
    password: configPassword,
    database: 'topbunk'
  }
});

module.exports = connection;
