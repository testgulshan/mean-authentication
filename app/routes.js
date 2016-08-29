var Users = require('./config.js');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('index.html');
  });

  // get all users
  app.get('/api/users', function (req, res) {
    Users.find(function (err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

  // get specific user via id
  app.get('/api/users/:id', function (req, res) {
    Users.findOne({
      _id: req.params.id
    }, function (err, user) {
      if (err)
        res.send('error occurred');

      res.json(user);
    })
  });

  // create new user
  app.post('/api/users', function (req, res) {
    Users.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email
    }, function (err, user) {
      if (err)
        res.send(err);

      Users.find(function (err, users) {
        if (err)
          res.send(err);

        res.json(users);
      })
    });
  });

  // delete an existing user
  app.delete('/api/users/:id', function (req, res) {
    Users.remove({
      _id: req.params.id
    }, function (err, user) {
      if (err)
        res.send(err)

      Users.find(function (err, users) {
        if(err)
          res.send(err)

        res.send(users);
      })
    })
  })

  // update an existing user
  app.put('/api/users/:id', function (req, res) {
    var query ={_id: req.params.id};
    var updates = req.body;

    Users.findOneAndUpdate(query, {$set: updates}, {upsert: true}, function (err, users) {
      if(err)
        res.send(err)

      res.send(users);
    })
  })
}