// Load in our dependencies
const passport = require('passport')
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Any example data
const secrets = {"Name" : "Anu Dhull","Email" : "dhullanu99@gmail.com"};

app.get('/', function(req, res){
  res.send("Welcome to assessment API");
})

// Register the route to get a new token everytime
// It will generate a new token that is valid for 5 minutes
app.get('/token', function(req, res){
  var token = jwt.sign(secrets, 'supersecret',{expiresIn: 300});
  res.send(token)
})

// Register a route that requires a valid token to view data
app.get('/user/profile', function(req, res){
  var token = req.query.token;
  jwt.verify(token, 'supersecret', function(err, decoded){
    if(!err){
      res.json(secrets);
    } else {
      res.send(err);
    }
  })
})

// Run on port 3000
app.listen('3000');