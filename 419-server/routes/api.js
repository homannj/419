"use strict";
// Dependencies
let express = require('express');
let router = express.Router();

// Models
let Categories = require('../models/categories');

// Routes
Categories.methods(['get', 'put', 'post', 'delete']);
Categories.register(router, '/categories');

// Return router
module.exports = router;
