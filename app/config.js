var mongoose = require('mongoose');

// schema definition
var userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  city: String
});

module.exports = mongoose.model('users', userSchema);