//var express = require('express');
//var passport = require('passport');
//var router = express.Router();
//var isAuthenticated = function(req, res, next) {
//	if(req.isAuthenticated())
//		return next();
//	res.redirect('/');
//}
//router.get('/signup', function (req, res) {
//    res.sendfile('./views/register.html', { message: reg.flash('message') });
//});
//router.get('/', function(req, res) {
//	res.sendfile('./views/index.html', {message : req.flash('message')});
//});
//router.post('/login', passport.authenticate('login', {
//	successRedirect:'/home',
//	failureRedirect:'/',
//	failureFlash: true
//}));
//router.post('/signup', passport.authenticate('signup', {
//	successRedirect: '/home',
//	failureRedirect: '/signup',
//	failureFlash: true
//}));
//router.get('/home', isAuthenticated, function(req, res){
//	res.render('views/home.html', { user: req.user });
//});
//router.get('/signout', function(req, res) {
//	req.logout();
//	res.redirect('/');
//});
//module.exports = router;
//DO NOT USE THIS;