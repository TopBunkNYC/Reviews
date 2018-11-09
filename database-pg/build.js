const faker = require('faker');
const knex = require('../database/index.js');
const moment = require('moment');


const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
  let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return rand.toISOString().slice(0,10);
}

let startTime = new Date().getTime() / 1000;

let reviewsArr = [];
for (let i = 1; i < 6; i++) {   // number between 1 to 10,000,000
  reviewsArr.push({
    r_id: i,
    booking_id: Math.ceil(Math.random() * 10000000),    
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

let bookingsArr = [];
for (let i = 1; i < 6; i++) {   // number betw 1 to 10,000,000
  let stay_start = randomDate();
  let duration = Math.ceil(Math.random() * 7);
  let stay_end = moment(stay_start).add(duration, 'days').toISOString().slice(0, 10);
  bookingsArr.push({
    b_id: i,
    listing_id: Math.ceil(Math.random() * 1000000),
    user_id: Math.ceil(Math.random() * 1000000),
    stay_start: stay_start,
    stay_end: stay_end
  })
}

let listingsArr = [];
for (let i = 1; i < 6; i++) {   // number betw 1 to 1,000,000
  listingsArr.push({
    l_id: i
  })
}

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

console.log('reviewsArr:', reviewsArr);
console.log('bookingsArr:', bookingsArr);
console.log('listingsArr:', listingsArr);
console.log('usersArr:', usersArr);

knex.batchInsert('Reviews', reviewsArr);
