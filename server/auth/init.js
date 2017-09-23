var passport = require('passport');
var User = require('../models/user');


module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log("Serializing");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("Derializing");
    User.findById(id.toString(), function (err, user) {
      done(err, user);
    });
  });

};
