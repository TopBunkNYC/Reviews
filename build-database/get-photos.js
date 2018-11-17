const fs = require('fs');
const axios = require('axios');

for (let i = 0; i < 1000; i++) {
  axios({
    method: 'get',
    url: `https://loremflickr.com/50/50/travel,city,person/all?random=${i}`,
    responseType: 'stream'
  })
  .then((response) => {
    response.data.pipe(fs.createWriteStream(`./build-database/photos/profile_photo_${i}.jpg`))
    .on('close', () => { console.log('Image #', i, "downloaded.") })
  })
  .catch((err) => {
    console.error('error in axios promise:', err);
  })
}

