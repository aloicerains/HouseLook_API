// Express web server setup
const express = require('express');
const cors = require('cors');
const app = express();

// get path
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));
// edit later if needed
const corsOptions = {
  origin: 'http://localhost:8081'
};
app.use(cors(corsOptions));
// parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse request of content-type -application/json
app.use(express.json());

// simple index route
app.get('/api/v1', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/home.html'));
});
// to test connection
// use this => const sql = require("./app/models/db.js");

require('./app/routes/places.js')(app);
require('./app/routes/houses.js')(app);
require('./app/routes/rooms.js')(app);
require('./app/routes/users.js')(app);
require('./app/routes/reviews.js')(app);
require('./app/routes/owners.js')(app);
app.get('*', (req, res) => {
  res.status(400).send({});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
