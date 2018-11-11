const faker = require('faker');
const moment = require('moment');
const pgMethods = require('../database-pg/load-pg.js');

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
  // 80 is for 100k, 800 is for 1 million, 8000 for 10 million
  for (let i = 0; i < 8000; i++) {   // number between 1 to 10,000,000
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
    await pgMethods.insertReviewsPG();
  }
  endWrite = moment();
  console.log('duration for Reviews creation & writing:', endWrite.diff(startWrite), 'ms');
  

  ////////// BOOKINGS //////////
  let startObjectKeys = moment();
  let bookingIds = Object.keys(bookingIdHash);
  let bookingIdTracker = 0;
  let endObjectKeys = moment();
  console.log('duration for Object.keys on hashtable:', endObjectKeys.diff(startObjectKeys), 'ms');
  
  startWrite = moment();
  for (let i = 0; i < 8000; i++) {
    let bookingsArr = [];

    for (let j = 0; j < 1250; j++) {
      let stay_start = randomDate();
      let duration = Math.ceil(Math.random() * 7);
      let stay_end = moment(stay_start).add(duration, 'days').toISOString().slice(0, 10);
      bookingsArr.push({
        b_id: bookingIds[bookingIdTracker++],
        listing_id: Math.ceil(Math.random() * 1000000),
        user_id: Math.ceil(Math.random() * 1000000),
        stay_start: stay_start,
        stay_end: stay_end
      })
    }
    await pgMethods.insertBookingsPG();
  }
  endWrite = moment();
  console.log('duration for Bookings creation & writing (after Object.keys):', endWrite.diff(startWrite), 'ms');

  ////////// LISTINGS //////////
  startWrite = moment();
  let listingIdTracker = 1;
  for (let i = 0; i < 800; i++) {
    let listingsArr = [];
    for (let j = 0; j < 1250; j++, listingIdTracker++) {   // number betw 1 to 1,000,000
      listingsArr.push({
        l_id: listingIdTracker
      })
    }
    try {
      await pgMethods.insertListingsPG();
    } catch (error) {
      console.error(error);
    }
  }

  endWrite = moment();
  console.log('duration for Listings creation & writing:', endWrite.diff(startWrite), 'ms');
  
  ////////// USERS //////////
  startWrite = moment();
  let userIdTracker = 1;
  for (let i = 0; i < 800; i++) {
    let usersArr = [];

    for (let j = 0; j < 1250; j++, userIdTracker++) {   // number betw 1 to 1,000,000
      usersArr.push({
        u_id: userIdTracker,
        username: faker.internet.userName(),
        display_name: faker.name.firstName(),
        photo_url: faker.image.imageUrl(48, 48),
        profile_url: faker.internet.url()
      })
    }
    await pgMethods.insertUsersPG();
  }
  endWrite = moment();
  console.log('duration for Users creation & writing:', endWrite.diff(startWrite), 'ms');

  let endAll = moment();
  console.log('duration for entire build:', endAll.diff(startAll), 'ms');
  knex.destroy();
})()
