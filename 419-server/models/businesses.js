"use strict";
// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

// Export model
module.exports = restful.model('Businesses',
  new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    url: String,
    reuseCategories: Array,
    repairCategories: Array,
    hours: String,
    latitude: Number,
    longitude: Number,
    notes: String
  }), 'Businesses'
);
