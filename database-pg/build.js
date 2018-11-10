const faker = require('faker');
const knex = require('../database-pg/index.js');
const moment = require('moment');


const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
  let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return rand.toISOString().slice(0,10);
}

let startWrite;
let endWrite;


(async () => {
  let startAll = moment();
  
  ////////// REVIEWS //////////
  startWrite = moment();
  let bookingIdHash = {};
  
  for (let i = 0; i < 80; i++) {   // number between 1 to 10,000,000
    let reviewsArr = [];

    for (j = 0; j < 1250; j++) {
      let bookingId = Math.ceil(Math.random() * 400000000);
      if (!bookingIdHash.hasOwnProperty(bookingId)) {
        bookingIdHash[bookingId] = true;
      } else {
        while (bookingIdHash.hasOwnProperty(bookingId)) {
          bookingId++;
        }
        bookingIdHash[bookingId] = true;
      }
  
      reviewsArr.push({
        booking_id: bookingId,    
        review_date: randomDate(),
        review_text: faker.lorem.paragraphs(Math.ceil(Math.random() * 2)),
        accuracy: Math.ceil(Math.random() * 4),
        communication: Math.ceil(Math.random() * 4),
        cleanliness: Math.ceil(Math.random() * 4),
        location: Math.ceil(Math.random() * 4),
        checkin: Math.ceil(Math.random() * 4),
        value: Math.ceil(Math.random() * 4)
      })
    }
    await knex.batchInsert('topbunk.reviews', reviewsArr, 625);
  }
  endWrite = moment();
  console.log('duration for Reviews creation & writing:', endWrite.diff(startWrite), 'ms');
  

  ////////// BOOKINGS //////////
  let startObjectKeys = moment();
  let bookingIds = Object.keys(bookingIdHash);
  let idTracker = 0;
  let endObjectKeys = moment();
  console.log('duration for Object.keys on hashtable:', endObjectKeys.diff(startObjectKeys), 'ms');
  
  startWrite = moment();
  for (let i = 0; i < 80; i++) {
    let bookingsArr = [];

    for (let j = 0; j < 1250; j++) {
      let stay_start = randomDate();
      let duration = Math.ceil(Math.random() * 7);
      let stay_end = moment(stay_start).add(duration, 'days').toISOString().slice(0, 10);
      bookingsArr.push({
        b_id: bookingIds[idTracker++],
        listing_id: Math.ceil(Math.random() * 1000000),
        user_id: Math.ceil(Math.random() * 1000000),
        stay_start: stay_start,
        stay_end: stay_end
      })
    }
    await knex.batchInsert('topbunk.bookings', bookingsArr, 625);
  }
  endWrite = moment();
  console.log('duration for Bookings creation & writing (after Object.keys):', endWrite.diff(startWrite), 'ms');

  ////////// LISTINGS //////////
  startWrite = moment();
  for (let i = 0; i < 80; i++) {
    let listingsArr = [];
    let idTracker = 1;
    for (let j = 1; j < 1250; j++) {   // number betw 1 to 1,000,000
      listingsArr.push({
        l_id: idTracker++
      })
    }
    await knex.batchInsert('topbunk.listings', listingsArr, 625);
  }

  endWrite = moment();
  console.log('duration for Listings creation & writing:', endWrite.diff(startWrite), 'ms');
  
  ////////// USERS //////////
  let usersArr = [];
  for (let i = 1; i < 6; i++) {   // number betw 1 to 1,000,000
    usersArr.push({
      u_id: i,
      username: faker.internet.userName(),
      display_name: faker.name.firstName(),
      photo_url: faker.image.imageUrl(48, 48),
      profile_url: faker.internet.url()
    })
  }
  await knex.batchInsert('topbunk.users', usersArr);
  
  // const used = process.memoryUsage().heapUsed / 1024 / 1024;
  // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

  let endAll = moment();
  console.log('duration for entire build:', endAll.diff(startAll), 'ms');
  knex.destroy();
})()
