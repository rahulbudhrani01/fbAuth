var express = require('express');
var router = express.Router();


var passportFacebook = require('../auth/facebook');

// Define routes.

router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login',
  function(req, res){
    res.render('login');
  });

router.get('/login/facebook', passportFacebook.authenticate('facebook'));

router.get('/login/facebook/return',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),  function(req, res) {
    //res.redirect('/profile');

    //Successful authentication
  // res.json(req.user);
   res.send('Hurray!! signed in!');
   //res.redirect('/profile');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = router;
