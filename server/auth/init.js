var passport = require('passport');
var User = require('../models/user');


module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log("Serializing");
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
      User.findOne({_id:id}, function(err, user) {
        done(err, user);
      });
    });

};
