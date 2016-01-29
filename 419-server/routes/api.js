"use strict";
// Dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

// Models
const ReuseCategories = require('../models/reuseCategories');
const RepairCategories = require('../models/repairCategories');
const Businesses = require('../models/businesses');
const Users = require('../models/users');

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

Users.methods(['get', 'post']);
Users.before('post', generateHash);
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
        if (user.password != userInfo.password) {
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
        } 
        else {
          // var token = jwt.sign(user.userId, app.get('secret'), {
          // expiresIn: "24h" // expires in 24 hours
          // });
          
          // For debugging 
          // console.log("token: " + token);
          // var decoded = jwt.decode(token);
          // console.log("decodedtoken: " + decoded);
          // res.json(decoded);
          
          // res.json({
          //   success: true,
          //   message: 'Enjoy your token!',
          //   token: token
          // });
          // return;
          // console.log(user.generateHash("blah"));
          res.json({success: true, userToken: ''});
          return;
        }
      }
    })
  });
Users.register(router, '/users');

function generateHash(req, res, next) {
  req.body.passwordHash = bcrypt.hashSync(req.body.passwordHash, bcrypt.genSaltSync(8), null);
  next(); 
};

// Return router
module.exports = router;
