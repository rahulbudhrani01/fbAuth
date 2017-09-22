var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  // facebook sends back the tokens and progile info
  function(token, tokenSecret, profile, done) {
    console.log("Inside the function");
    var searchQuery = {

      name: profile.displayName
    };
    console.log("After searchQuery");
    var updates = {

      name: profile.displayName,
      someID: profile.id
    };
    console.log("After updates");
    var options = {

      upsert: true
    };
    console.log("After options\n username:"+profile.displayName);
    console.log("id:"+profile.id);
    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        console.log("Inside findOneAndUpdate");
      if(err) {
          throw err;
        return done(err);
      } else {
        console.log("Updated");
        return done(null, user);

      }
    });
  }));

// serialize user into the session
init();


module.exports = passport;
