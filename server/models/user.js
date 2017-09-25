var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  name: String,
  id: String,
});


module.exports = mongoose.model('User', User);
