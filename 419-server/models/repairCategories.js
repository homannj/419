"use strict";
// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

// Export model
module.exports = restful.model('RepairCategories',
  new mongoose.Schema({
    name : String,
    item : [String],
    description : Array
  }), 'RepairCategories'
);
