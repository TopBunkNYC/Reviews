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
  let bookingIdHash = {};
  
  startWrite = moment();
  for (let i = 1; i < 100; i++) {   // number between 1 to 10,000,000
    let reviewsArr = [];

    for (j = 0; j < 1000; j++) {
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
    await knex.batchInsert('topbunk.reviews', reviewsArr, 500);
  }
  endWrite = moment();
  console.log('duration for Reviews creation & writing:', endWrite.diff(startWrite), 'ms');
  
  let bookingsArr = [];
  let bookingIds = Object.keys(bookingIdHash);
  for (let i = 0; i < 6; i++) {   // number betw 0 to 9,999,999
    let stay_start = randomDate();
    let duration = Math.ceil(Math.random() * 7);
    let stay_end = moment(stay_start).add(duration, 'days').toISOString().slice(0, 10);
    bookingsArr.push({
      b_id: bookingIds[i],
      listing_id: Math.ceil(Math.random() * 1000000),
      user_id: Math.ceil(Math.random() * 1000000),
      stay_start: stay_start,
      stay_end: stay_end
    })
  }
  await knex.batchInsert('topbunk.bookings', bookingsArr);
  
  let listingsArr = [];
  for (let i = 1; i < 6; i++) {   // number betw 1 to 1,000,000
    listingsArr.push({
      l_id: i
    })
  }
  await knex.batchInsert('topbunk.listings', listingsArr);
  
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
