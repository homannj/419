"use strict";
// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');
// Database connect
const database = require('./config/database');
mongoose.connect(database.url);
const db = mongoose.connection;
db.on('error', () => console.log ('error connecting to MongoDB'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // Express
  const app = express();
  require('./config/passport')(passport);
  app.use(expressSession({secret: 'mySecretKey'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Routes
  require('./routes/routes.js')(app, passport);
  app.use('/api', require('./routes/api'));
  app.use (express.static(__dirname+'/public'));
  // Start server
  app.listen(3000);
  console.log('API is running on port 3000');
});
