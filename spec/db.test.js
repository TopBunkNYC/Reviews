const _ = require('lodash');
const Promise = require('bluebird');

const now = require('performance-now');
let knex;
let mongoose;
let loops = 1000;

jest.setTimeout(60000);

describe('PostgreSQL database speed', () => {
  beforeAll(() => {
    knex = require('../database-pg/index.js');
  })

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
    let totalTimev2 = 0;
    const times = {};

    knex.on('query', (query) => {
      startTime = now(); // for old way
      const uid = query.__knexQueryUid;
      times[uid] = {
        start: now(),
        finished: false
      }
    })
    .on('query-response', (response, query) => {
      const uid = query.__knexQueryUid;
      times[uid].end = now();
    })

    for (let i = 0; i < loops; i++) {
      // choose a random id between 9,600,000 to 9,650,000
      let id = Math.ceil(Math.random() * 50000) + 9600000;
      
      await knex.raw('select * from reviews where r_id = ?', [id])
      .then(() => {
        endTime = now();
        totalTime += (endTime - startTime);
      })
    }

    let averageTime = totalTime / loops;
    console.log('old way: average time for Review queried on Review ID (key) is', averageTime);

    for (let run in times) {
      times[run].duration = times[run].end - times[run].start;
      totalTimev2 += times[run].duration;
    }
    
    let newAverage = totalTimev2 / loops;

    console.log('new way: average time for Review queried on Review ID (key) is', newAverage);
    expect(averageTime).toBeLessThan(50);

    // for (let i = 0; i < 500; i++) {
    //   // choose a random id between 9,600,000 to 9,650,000
    //   let id = Math.ceil(Math.random() * 50000) + 9600000;
    //   knex.on('query', () => {
    //     startTime = now();
    //   })
    //   await knex.raw('select * from reviews where r_id = ?', [id])
    //   .then(() => {
    //     endTime = now();
    //     totalTime += (endTime - startTime);
    //   })
    // }

    // let averageTime = totalTime / 500;
    // console.log('average time for Review queried on Review ID (key) is', averageTime);
    // expect(averageTime).toBeLessThan(50);
  })

  test('writes database records to Reviews table in <50 ms', async () => {
    // let totalTime = 0;
    // let startTime;
    // let endTime;
    // let orderedOptions = [-1, new Date().toISOString().slice(0,10), 'this is review text',
    //   5, 4, 3, 5, 4, 3];

    // for (let i = 0; i < 500; i++) {
    //   knex.on('query', () => {
    //     startTime = now();
    //   })
    //   await knex.raw(`INSERT into Reviews 
    //     (booking_id, review_date, review_text, accuracy, 
    //     communication, cleanliness, location, checkin, value)
    //   VALUES
    //     (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [...orderedOptions])
    //   .then(() => {
    //     endTime = now();
    //     totalTime += (endTime - startTime);
    //   })
    //   .catch((err) => { console.error(err); }) 
    // }

    // let averageTime = totalTime / 500;
    // await knex.raw(`DELETE FROM reviews where booking_id = -1`);
    // console.log('average time for write to Review table is', averageTime);
    // expect(averageTime).toBeLessThan(50);
  })

  test('reads from database, joining relational data from all four tables in <50 ms', async () => {
    // add tests here
  })

  test('writes relational data to all four database tables in <50 ms', async () => {
    // add tests here
  })

})

describe('MongoDB database speed', () => {
  // beforeAll(async() => {
  //   mongoose = require('../database-mongo/index.js');
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 1000)
  //   });
  // })

  // afterAll(() => {
  //   mongoose.connection.close();
  // })

  test('reads database records from Reviews table based on Review ID in <50 ms', async () => {
    // has a test
  })
})


