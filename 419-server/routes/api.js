"use strict";
// Dependencies
const express = require('express');
const router = express.Router();

// Models
const ReuseCategories = require('../models/reuseCategories');
const RepairCategories = require('../models/repairCategories');
const Businesses = require('../models/businesses');
// Routes
Businesses.methods(['get', 'put', 'post', 'delete']);
Businesses.register(router, '/businesses');
ReuseCategories.methods(['get', 'put', 'post', 'delete']);
ReuseCategories.register(router, '/reuseCategories');
RepairCategories.methods(['get', 'put', 'post', 'delete']);
RepairCategories.route('businesses', {
    detail: true,
    handler: function(req, res, next) {
      RepairCategories.findOne({_id :req.params.id}, (err, cat) => {
        Businesses.find({repairCategories : cat.name}, (err,bus) => {
          res.send(bus);
        });

      });
    }
});
RepairCategories.register(router, '/repairCategories');


// Return router
module.exports = router;
