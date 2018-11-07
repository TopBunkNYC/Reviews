# Reviews
This is the "Reviews" module in our TopBunk web application.


## Related Projects

  - https://github.com/TopBunkNYC/Description
  - https://github.com/TopBunkNYC/Booking
  - https://github.com/TopBunkNYC/Neighborhood 

## Development
To run the application in non-development mode from within the root directory: 
```sh
npm run seed
npm run build
npm start
```

Then access the application at (http://localhost:8001).

The `seed` script will run the MySQL schema and table creation, and then load data into the tables created. You will need to set up a `config.js` file at the root of your folder with the following structure:
```js
exports.dbConfig = {
  host     : 'your_host_name',
  user     : 'your_user_name',
  password : 'your_password',
  database : 'topbunk'
}
```

To run in developer mode:
```sh
npm run seed
npm run react-dev
npm run start-dev
npm test
```


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```