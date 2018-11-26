const Promise = require('bluebird');
const now = require('performance-now');
let knex;
let mongoose;
let loops = 500;

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
    console.log('Postgres: average time for Review table queried on Review ID (key) is', averageTime);
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
    console.log('Postgres: average write time for Review table is', averageTime);
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
      .then(() => {
        endTime = now();
        totalTime += (endTime - startTime);
      })
      .catch((err) => { console.error(err); }) 
    }

    let averageTime = totalTime / loops;
    console.log('Postgres: average read time for joined relational data is', averageTime);
    expect(averageTime).toBeLessThan(50);
  })
})

describe('MongoDB database speed', () => {
  beforeAll(async() => {
    mongoose = require('../database-mongo/index.js');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    });
    Listing = require('../database-mongo/schemas.js').ListingModel;
  })

  afterAll(() => {
    mongoose.connection.close();
  })

  test('reads database records from Reviews table based on Review ID in <50 ms', async () => {
    let totalTime = 0;
    let startTime;
    let endTime;

    for (let i = 0; i < loops; i++) {
      // choose a random id between 900,000 to 950,000
      let id = Math.ceil(Math.random() * 50000) + 900000;

      startTime = now();
      await Listing.findOne({_id: id})
      .then(() => {
        endTime = now();
        totalTime += (endTime - startTime);
      })
    }

    let averageTime = totalTime / loops;
    console.log('MongoDB: average time for Review table queried on Review ID (key) is', averageTime);
    expect(averageTime).toBeLessThan(50);
  })

  test('writes database records to Reviews table in <50 ms', async () => {
    let totalTime = 0;
    let startTime;
    let endTime;

    for (let i = 0; i < loops; i++) {
      startTime = now();
      await Listing.create({
        _id: -i,
        reviews: [{
          _id: -i,
          review_date: now(),
          review_text: 'this is a test',
          accuracy: 5,
          communication: 5,
          cleanliness: 5, 
          location: 5,
          checkin: 5,
          u_id: -999,
          username: 'NotARealName',
          display_name: 'NotAName',
          photo_url: 'http://lorempixel.com/48/48',
          profile_url: 'http://www.example.com/'
        }]
      })
      .then(() => {
        endTime = now();
        totalTime += (endTime - startTime);
      })
      .catch((err) => {
        console.error(err);
      })
    }

    let averageTime = totalTime / loops;
    console.log('MongoDB: average write time for Review table is', averageTime);
    expect(averageTime).toBeLessThan(50);

    await Listing.deleteMany({_id: {$lte: 0}})
    .catch((err) => { 
      console.error(err); 
    })
  })
})
