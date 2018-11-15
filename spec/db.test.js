const knex = require('../database-pg/index.js');
// const mongoose = require('../database-mongo/index.js');

const now = require('performance-now');

jest.setTimeout(60000);

describe('PostgreSQL database speed', () => {
  beforeEach(async () => {
    // do a simple query to connect to the database
    await knex.raw('select * from reviews where r_id = ?', [1]);
  });

  afterAll(() => {
    knex.destroy();
  });

  test('reads database records from Reviews table based on Review ID in <50 ms', async () => {
    let totalTime = 0;
    let startTime;
    let endTime;

    for (let i = 0; i < 5000; i++) {
      // choose a random id between 9,600,000 to 9,650,000
      let id = Math.ceil(Math.random() * 50000) + 9600000;
      knex.on('query', () => {
        startTime = now();
      })
      await knex.raw('select * from reviews where r_id = ?', [id])
      .then((result) => {
        endTime = now();
        totalTime += (endTime - startTime);
        if (i === 4999) { console.log(result.rows) }
      })
    }

    let averageTime = totalTime / 5000;
    console.log('average time for Review queried on Review ID (key) is', averageTime);
    expect(averageTime).toBeLessThan(50);
  })

  test('writes database records to Reviews table in <50 ms', async () => {
    let totalTime = 0;
    let startTime;
    let endTime;
    let orderedOptions = [-1, new Date().toISOString().slice(0,10), 'this is review text',
      5, 4, 3, 5, 4, 3];

    for (let i = 0; i < 2; i++) {
      knex.on('query', () => {
        startTime = now();
      })
      await knex.raw(`INSERT into Reviews 
        (booking_id, review_date, review_text, accuracy, 
        communication, cleanliness, location, checkin, value)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [...orderedOptions])
      .then((result) => {
        endTime = now();
        totalTime += (endTime - startTime);
        if (i === 9) {
          console.log('result of write operation is', result)
        }
      })
      .catch((err) => { console.error(err); }) 
    }

    let averageTime = totalTime / 10;
    await knex.raw(`DELETE FROM reviews where booking_id = -1`);
    console.log('average time for write to Review table is', averageTime);
    expect(averageTime).toBeLessThan(50);
  })

  test('reads from database, joining relational data from all four tables in <50 ms', async () => {
    // add tests here
  })

  test('writes relational data to all four database tables in <50 ms', async () => {
    // add tests here
  })

})


