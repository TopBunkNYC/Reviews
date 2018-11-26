const axios = require('axios');

describe('API functionality', () => {
  beforeAll(() => {
    knex = require('../database-pg/index.js');
  })

  afterAll(() => {
    knex.destroy();
  });

  test('creates a review', async () => {
    await axios.post('http://localhost:8001/reviews', {
      "bookingId": -1,
      "reviewText": "This is just a test! I did not stay here.",
      "accuracy": 5,
      "communication": 4,
      "cleanliness": 5,
      "location": 4,
      "checkin": 5, 
      "value": 4
    })
    .then(async () => {
      return knex.select().table('reviews').where('booking_id', -1)
      .then((result) => {
        expect(result[0].review_text).toBe('This is just a test! I did not stay here.');
      })
      .then(() => {
        return knex('reviews').where('booking_id', -1).del()
      })
      .catch(err => console.error(err))
    })
  })

  test('reads/retrieves all reviews for a listing ID', async () => {
    await axios.get('http://localhost:8001/reviews', {
      params: {
        id: 13
      }
    })
    .then(({data}) => {
      expect(data[0].username).toBe('Zola.Skiles');
    })
  })

  test('reads/retrieves a single review by review ID', async () => {
    await axios.get('http://localhost:8001/review', {
      params: {
        r_id: 13
      }
    })
    .then(({data}) => {
      expect(data[0].booking_id).toBe(31621075);
    })
  })

  test('updates a review', async () => {
    await axios.put('http://localhost:8001/reviews', {
      r_id: 100,
      newReviewText: 'Temporarily changed!'
    })
    .then(await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 35)
    }))
    .then(
      await axios.get('http://localhost:8001/review', {
        params: {
          r_id: 100
        }
      })
      .then(({data}) => {
        let temp = data[0].review_text;
        expect(temp).toBe('Temporarily changed!');
      })
      .then(async() => {
        return knex('reviews').where('r_id', 100).update({
          review_text: 'Sed exercitationem et esse est harum unde laboriosam possimus. Nam qui eligendi recusandae et temporibus animi. Quibusdam adipisci autem sequi iusto aut sequi dicta odit alias. Sit perspiciatis voluptas perspiciatis. In qui eos earum.'
        })
        .then((data) => console.log('number of rows changed:', data))
        .then()
      })
      .catch((err) => console.error(err))
    )
  })
})
