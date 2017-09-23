
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






// *** mongoose *** //
mongoose.connect('mongodb://config.database.username:config.database.password@18.221.155.123:27017/passport-social-auth',  { useMongoClient: true });
//mongoose.connect('mongodb://127.0.0.1:27017/passport-social-auth');






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



app.listen(3000);
