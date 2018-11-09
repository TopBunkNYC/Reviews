const faker = require('faker');
const knex = require('./index.js');


const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
  let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return rand.toISOString().slice(0,10);
}

let startTime = new Date().getTime() / 1000;

let reviewsArr = [];
for (let i = 0; i < 5; i++) {
  reviewsArr.push({
    booking_id: Math.ceil(Math.random() * 10000000),    // number betw 1 to 10,000,000
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

console.log(reviewsArr);
