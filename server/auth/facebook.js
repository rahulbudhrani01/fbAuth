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
    process.nextTick(function() {
    console.log("Inside fb token function");
    var newUser = new User();
    newUser.id = profile.id;
    //newUser.facebook.token = token;
    newUser.name = profile.displayName;
    //newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

    newUser.save(function(err) {
      if (err)
        throw err;
      //return done(null, newUser);
    });
    var searchQuery = {

      name: profile.displayName
    };

    var updates = {$set:{

      //name: profile.displayName,
      id: profile.id
    }};

    var options = {

      new: true
    };

  //  return done(null, profile);
  //   }));

  console.log("User:"+profile.displayName);
  console.log("Id:"+profile.id);

    // update the user if s/he exists or add a new user
    User.findOne(searchQuery, function(err, user) {
      console.log("Inside findOne funtion");
       if (err)
         return done(err);
       if (user) {
         return done(null, user);
       } else {
           console.log("Inside add new User else");
           var newUser = new User();
           newUser.id = profile.id;
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

     /*User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
       if(err) {
         return done(err);
       } else {
         return done(null, user);
       }
     });*/
 });

   }));

// serialize user into the session

init();




module.exports = passport;
