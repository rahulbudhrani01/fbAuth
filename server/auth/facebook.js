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
    /*
    var searchQuery = {

      name: profile.displayName
    };

    var updates = {$set:{

      //name: profile.displayName,
      someID: profile.id
    }};

    var options = {

      new: true
    };

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

*/
process.nextTick(function() {
      User.findOne({ 'someID': profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.someID = profile.id;
          //newUser.facebook.token = token;
          newUser.name = profile.displayName;
          //newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
module.exports = passport;
