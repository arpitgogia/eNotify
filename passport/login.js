var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcryptjs');

module.exports = function(passport) {
    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({'username':username}, 
        function(err, user) {
            if(err)
                // In case of any error, return using the done method.
                return done(err);
            if(!user) {
                console.log('User not found with username ' + username);
                return done(null, false, req.flash('message', 'User Not Found.'));
            }
            if(!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password'));
            }
            return done(null, user);
        });}));
}