const knex = require('../database-pg/index.js');
const now = require('performance-now');
const moment = require('moment');

// let id = Math.ceil(Math.random() * 100000) + 9500000;
// let start;
// knex.on('query', () => {
//   start = now();
// })
// knex.raw('select * from reviews where r_id = ?', [id])
// .then((response) => {
//   let end = now();
//   let totalTime = (end - start);
//   console.log('totalTime:', totalTime);
//   console.log('response:', response);
// })

let x;
let startTestMoment = moment();
let startTestNow = now();
while (moment().diff(startTestMoment) < 1000) {
  x++;
}
let endTestMoment = moment();
let endTestNow = now();
console.log('difference in moment is:', (endTestMoment - startTestMoment));
console.log('difference in now() is:', endTestNow - startTestNow);

