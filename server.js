var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var port            = 3000;
var morgan          = require('morgan');

var mongoose        = require('mongoose');
    mongoose.connect('mongodb://localhost/mean-auth');

// var multer          = require('multer');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');


// middleware ===================================
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({type: 'application/vnd.api+json'}));


// PASSPORT =====================================
var passport        = require('passport');
var UserModel       = require('./app/config.js');
var LocalStrategy   = require('passport-local').Strategy;

app.use(session({secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    // overwrite default username field with email [https://stackoverflow.com/questions/18138992/use-email-with-passport-local-previous-help-not-working]
    usernameField: 'email'  
    // passportField: 'passwd'
  },function (email, password, done) {
    UserModel.findOne({email: email, password: password}, function (err, user) {
      if(user) {
        return done(null, user);
      }
      return done(null, false, {message: 'Unable to login'})
    })
}));

passport.serializeUser(function (user, done) {
  done(null, user);
})
passport.deserializeUser(function (user, done) {
  done(null, user);
})

// PASSPORT ROUTING =============================
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log('/login');
  console.log(req.user);
  res.json(req.user);
});

app.post('/logout', function (req, res) {
  req.logOut();
  res.send(200);
});

app.post('/register', function (req, res) {
  UserModel.findOne({email: req.body.email}, function (err, user) {
    if(user) {
      res.json(null);  // if already in database
      return;
    } else {
      var newUser = new UserModel(req.body);
      newUser.roles = ['student']; // default roules set to student
      newUser.save(function (err, user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          res.json(user);
        });
      });
    }
  })
  var newUser = req.body;
  console.log(newUser);
});

app.get('/loggedin', function (req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});






// error handling ===============================
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database: "mean-auth"');
});


// routing =========================================
require('./app/routes.js')(app);

app.listen(port, function () {
  console.log('server is running on http://localhost:' + port);
});