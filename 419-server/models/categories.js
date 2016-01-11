"use strict";
// Dependencies
let restful = require('node-restful');
let mongoose = restful.mongoose;

// Export model
module.exports = restful.model('CS496',
  new mongoose.Schema({
    name: String
  }), 'Categories'
);
