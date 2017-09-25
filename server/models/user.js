var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  name: String,
  id: Number,
});


module.exports = mongoose.model('User', User);
