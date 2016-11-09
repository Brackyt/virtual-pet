var express = require('express');
var jwt = require('jsonwebtoken');
var secret = "supersecretstarwars" || process.env.JWT_SECRET;
var User = require('../models/user');
var router = express.Router();
const util = require('util');


router.route('/')
  .put(function(req, res) {
    //getting the stats for the current user
    console.log("made it to the get route");
    console.log("this info came from the front end: " + util.inspect(req.body, false, null))
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) {return res.send(err)};
      if (user) {
        res.send(user);
      }
    })
  })
  .post(function(req, res) {
    // SIGNING UP FOR THE FIRST TIME
    // find the user first in case the email already exists
    User.findOne({ email: req.body.email }, function(err, user) {
      console.log("done looking for user!");
      if (user) return res.status(400).send({ message: 'Email already exists' });

      User.create(req.body, function(err, user) {
        console.log("tried to create user");
        if (err) {
          console.log("create user err:", err);
          return res.status(500).send(err);
        }

        console.log("created user", user);
        return res.send(user);
      });
    });
  });

router.route('/getstats')
.get(function(req, res) {
  console.log("made it to the getstats route");
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.send(err)
    };
    if (user) {
      res.send(user);
    }
  })
});

router.route('/auth')
  .get(function(req, res) {
    console.log("This is the auth backend yo!");
  })
  .post(function(req, res) {
    //LOGGING IN
    console.log(req.body);
    // find the user first in case the email already exists
    User.findOne({ email: req.body.email }, function(err, user) {
      console.log("found one user");
      
      if (err) {
        console.log("user not found. err:", err);
        return res.status(401).send({message: 'User not found', err: err});
      }

      if (!user) {
        console.log("email not found");
        return res.status(400).send({ message: 'email not found' });
      }
      
      console.log("authing");
      if (user.authenticated(req.body.password)) {
        console.log("authed");
        if (err) {
          console.log("auth failed");
          return res.status(401).send({message: 'User not authenticated'});
        }

        console.log("making token");
        var token = jwt.sign(user, secret);
        console.log("token:", token);
        res.send({user: user, token: token});
      };
    });
  });

  router.route('/stats')
  .get(function(req, res) {
    console.log("this is a route for editing stats");
  })
  .put(function(req, res) {
    console.log(req.body);
    console.log(req.body.data);
    User.findOne({email : user.email}, function(err, user) {
      if(req.data.health){user.pet.health = req.data.health};
      if(req.data.mood){user.pet.mood = req.data.mood};
      var activityId;
      if(req.data.activity){
        if(req.data.activity === 'feed'){activityId = 0};
        if(req.data.activity === 'sleep'){activityId = 1};
        if(req.data.activity === 'play'){activityId = 2};
        if(req.data.activity === 'clean'){activityId = 3};
        if(req.data.activity === 'nurse'){activityId = 4};
      }
      if(req.data.mhi){user.pet.stats[activityId].mhi += req.data.mhi};
      if(req.data.mmi){user.pet.stats[activityId].mmi += req.data.mmi};
      if(req.data.lastTime){user.pet.stats[activityId].lastTime = req.data.lastTime};
    })
  })


module.exports = router;