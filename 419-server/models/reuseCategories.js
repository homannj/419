"use strict";
// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

// Export model
module.exports = restful.model('ReuseCategories',
  new mongoose.Schema({
    name : String,
    description : Array
  }), 'ReuseCategories'
);
