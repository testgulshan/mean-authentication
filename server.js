var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var port            = 3000;
var morgan          = require('morgan');

var mongoose        = require('mongoose');
    mongoose.connect('mongodb://localhost/mean-auth');

// error handling ===============================
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database: "mean-auth"');
});

// middleware ===================================
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// routing =========================================
require('./app/routes.js')(app);

app.listen(port, function () {
  console.log('server is running on http://localhost:' + port);
});