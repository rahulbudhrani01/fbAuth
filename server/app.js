
// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./_config');
// *** routes *** //
var routes = require('./routes/index.js');


// *** express instance *** //
var app = express();
//mongoose.Promise = global.Promise;

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  //useMongoClient: true,
  user: 'rahul',
  pass: 'password'
}
//mongoose.connect(uri, options);



// *** mongoose *** //
//mongoose.connect('mongodb://config.database.username:config.database.password@18.221.155.123:27017/passport-social-auth',  { useMongoClient: true });
//mongoose.connect('mongodb://127.0.0.1:27017/passport-social-auth');
mongoose.connect('mongodb://18.221.155.123:27017/passport-social-auth', options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
  console.log("Can't connect");
  throw error;
});
var db = mongoose.connection;

// When successfully connected
db.on('connected', function() {
    console.log('Mongo DB connection open for DB');
});





// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');





// *** config middleware *** //
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// *** main routes *** //
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //


// production error handler

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,

  });
});

app.listen(3000);
