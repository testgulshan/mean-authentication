var mongoose = require('mongoose');

// schema definition
var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  roles: [String]
});

module.exports = mongoose.model('UserModel', UserSchema);

// var admin = new UserModel({username: 'gulshan', email: 'gulshan@gmail.com', password: 'kumar', firstname: 'Gulshan', lastname: 'kumar', roles: ['admin']})
// var student = new UserModel({username: 'Bob', email: 'bob@gmail.com', password: 'bob', firstname: 'Bob', lastname: 'Marley', roles: ['student']})

// admin.save();
// student.save();

// module.exports = mongoose.model('UserModel', UserSchema);