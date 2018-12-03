const pg = require('pg');
const configUser = process.env.dbUser || require('../config.js').pgDbConfig.user;
const configPassword = process.env.dbPassword || require('../config.js').pgDbConfig.password;
const configHost = process.env.pgIP || require('../config.js').pgDbConfig.host;
const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
    host: configHost,
    user: configUser,
    password: configPassword,
    database: 'topbunk'
  },
  pool: {
    min: 2,
    max: 20
  }
});

module.exports = connection;
