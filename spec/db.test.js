const _ = require('lodash');
const Promise = require('bluebird');

const now = require('performance-now');
let knex;
let mongoose;
let loops = 2;

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

    knex.on('query', () => {
      startTime = now(); 
    })
    .on('query-response', () => {
      endTime = now();
    })

    for (let i = 0; i < loops; i++) {
      // choose a random id between 9,600,000 to 9,650,000
      let id = Math.ceil(Math.random() * 50000) + 9600000;
      
      await knex.raw('select * from reviews where r_id = ?', [id])
      .then(() => {
        totalTime += (endTime - startTime);
      })
    }

    let averageTime = totalTime / loops;
    console.log('average time for Review queried on Review ID (key) is', averageTime);
    expect(averageTime).toBeLessThan(50);
  })

  test('writes database records to Reviews table in <50 ms', async () => {
    let totalTime = 0;
    let startTime;
    let endTime;
    let orderedOptions = [-1, new Date().toISOString().slice(0,10), 'this is review text',
      5, 4, 3, 5, 4, 3];

    for (let i = 0; i < loops; i++) {
      knex.on('query', () => {
        startTime = now();
      })
      await knex.raw(`INSERT into Reviews 
        (booking_id, review_date, review_text, accuracy, 
        communication, cleanliness, location, checkin, value)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [...orderedOptions])
      .then(() => {
        endTime = now();
        totalTime += (endTime - startTime);
      })
      .catch((err) => { console.error(err); }) 
    }

    let averageTime = totalTime / loops;
    await knex.raw(`DELETE FROM reviews where booking_id = -1`);
    console.log('average time for write to Review table is', averageTime);
    expect(averageTime).toBeLessThan(50);
  })

  test('reads from database, joining relational data from all four tables in <50 ms', async () => {
    let totalTime = 0;
    let startTime;
    let endTime;

    for (let i = 0; i < loops; i++) {
      // choose a random listingID from 940,000 to 990,000
      let listingId = Math.ceil(Math.random() * 50000) + 940000;
      knex.on('query', () => {
        startTime = now();
      })
      await knex.raw(`
        SELECT *
        FROM bookings
        INNER JOIN reviews
        ON (bookings.b_id = reviews.booking_id AND bookings.listing_id = ?)
        INNER JOIN users 
        ON (bookings.user_id = users.u_id)
        ORDER BY reviews.review_date DESC;
      `, (listingId))
      .then((result) => {
        endTime = now();
        totalTime += (endTime - startTime);
        console.log('sample output for join data:', result.rows)
      })
      .catch((err) => { console.error(err); }) 
    }

    let averageTime = totalTime / loops;
    console.log('average time for reads on joined relational data is', averageTime);
    expect(averageTime).toBeLessThan(50);

    /*
    
      SELECT *
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
      ORDER BY Reviews.review_date DESC;
    
    */
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


