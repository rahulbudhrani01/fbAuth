var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  name: String,
  someID: Number
});


module.exports = mongoose.model('user', User);
