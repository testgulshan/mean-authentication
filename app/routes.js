var passport  = require('passport');
var UserModel     = require('./config.js');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('index.html');
  });

  app.get('/rest/users', auth, function (req, res) {
    UserModel.find(function (err, users) {
      res.json(users);
    });
  });
}

var auth = function (req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
}