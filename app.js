var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var router = express.Router();
var dbConfig = require('./db');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
mongoose.connect(dbConfig.url);
var app = express();
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
////////////////Routes
app.get('/register', function (req, res) {
    res.render('register.html');
});
app.get('/', function (req, res) {
    res.render('index.html', { message: 'Hello World' });
});
app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));
app.post('/signup', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/register',
	failureFlash: true
}));
app.get('/home', isAuthenticated, function (req, res) {
    res.render('home.html', { user: req.user });
});
app.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/get_users', function(req, res) {
    var userlist = {
            users: []
        };
    var findUsers = function (db, callback) {
        var cursor = db.collection('users').find();
        cursor.each(function(err, doc) {
            if(doc != null) {
                userlist.users.push({
                    "username": doc.username,
                    "first_name": doc.first_name,
                    "email": doc.email
                });
            }
            else
                callback();
        });
    };
    MongoClient.connect('mongodb://localhost/passport', function(err, db) {
        findUsers(db, function() {
            db.close();
            res.json(userlist);
        });
    });
});
//<!--Routes-->
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.sendfile('error', {
            message: err.message,
            error: err
        });
    });
}
module.exports = app;