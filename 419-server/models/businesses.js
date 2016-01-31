"use strict";
// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

var businessSchema = new mongoose.Schema({
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
  notes: String,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
});

// Export model
module.exports = restful.model('Businesses', businessSchema, 'Businesses');
