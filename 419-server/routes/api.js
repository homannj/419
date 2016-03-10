"use strict";
// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

// Models
const ReuseCategories = require('../models/reuseCategories');
const RepairCategories = require('../models/repairCategories');
const Businesses = require('../models/businesses');
const Users = require('../models/users');

// Routes
Businesses.methods(['get', 'put', 'post', 'delete']);
Businesses.before('post', validateAPIKey);
Businesses.before('put', validateAPIKey);
Businesses.before('delete', validateAPIKey);
Businesses.before('post', checkGeoLocation);
Businesses.register(router, '/businesses');

ReuseCategories.methods(['get', 'put', 'post', 'delete']);
ReuseCategories.before('post', validateAPIKey);
ReuseCategories.before('put', validateAPIKey);
ReuseCategories.before('delete', validateAPIKey);
ReuseCategories.register(router, '/reuseCategories');

RepairCategories.methods(['get', 'put', 'post', 'delete']);
RepairCategories.before('post', validateAPIKey);
RepairCategories.before('put', validateAPIKey);
RepairCategories.before('delete', validateAPIKey);
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

Users.methods(['get', 'post', 'put', 'delete']);
Users.before('post', validateSuperUser);
Users.before('put', validateSuperUser);
Users.before('delete', validateSuperUser);
Users.before('post', generateHash);
Users.before('put', generateHash);
Users.route('authenticate.post', function(req, res, next) {
    var userInfo = new Users(req.body);
    Users.findOne({ 'email': userInfo.email }, function(err, user) {
      if (err) {
        console.log(err);
        res.json({success: false, message: err})
      }
      
      if (!user) {
        var message = 'Authentication failed. User not found.';
        res.json({success: false, message: message})
        console.log(message);
        return;
      }
      else if (user) {
        if (!user.validPassword(userInfo.passwordHash)) {
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
          return;
        } 
        else {
          var token = jwt.sign({ email: user.email }, "cs419", { expiresIn: '24h'});
         
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
          return;
        }
      }
    })
  });
  
Users.after('delete', function(req, res, next) {
  next();
});
Users.register(router, '/users');

function generateHash(req, res, next) {
  req.body.passwordHash = bcrypt.hashSync(req.body.passwordHash, bcrypt.genSaltSync(8), null);
  next(); 
};

function validateAPIKey(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, "cs419", function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    // if there is no token, return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

function validateSuperUser(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, "cs419", function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        
        Users.findOne({ 'email': decoded.email }, function(err, user) {
          if (err) {
            console.log(err);
            res.json({success: false, message: err})
          }
          
          if (!user) {
            var message = 'Authentication failed. User not found.';
            res.json({success: false, message: message})
            console.log(message);
            return;
          }
          else if (user) {
            if (user.isSuperAdmin) {
              next();
            } 
            else {
              res.json({success: false, message: 'Cannot add/modify user. Current logged in user has no access.'})
              return;
            }
          }
        })
      }
    });
  }
  else {
    // if there is no token, return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

// Google Geolocation Setup
var geoCoderProvider = 'google';
var geoCoder = require('node-geocoder')(geoCoderProvider);

function checkGeoLocation(req, res, next) {
  var businessInfo = new Businesses(req.body);
  var completeAddress = businessInfo.address + ',' + businessInfo.city + ',' + businessInfo.state + ',' + businessInfo.zip;
  
  // If there is no location data, try to find it.
  if (businessInfo.location.coordinates.length == 0) {
    geoCoder.geocode(completeAddress)
    .then(function(res) {
      // Get geolocation data if no location property was found or coordinates arr is empty
      if (!req.body.hasOwnProperty("location") || (req.body.location.hasOwnProperty("coordinates") && req.body.location.coordinates.length == 0)) {
        req.body["location"] = {type: 'Point', coordinates: []};
        req.body.location.coordinates.push(res[0].longitude);
        req.body.location.coordinates.push(res[0].latitude);
        next();
      }
      else {
        next();
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }
}

// Return router
module.exports = router;
