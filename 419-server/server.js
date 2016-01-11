"use strict";
// Dependencies
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// Database connect
let database = require('./config/database');
mongoose.connect(database.url);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to MongoDB'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // Express
  let app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Routes
  app.use('/api', require('./routes/api'));
  app.use (express.static(__dirname+'/public'));
  // Start server
  app.listen(3000);
  console.log('API is running on port 3000');
});
