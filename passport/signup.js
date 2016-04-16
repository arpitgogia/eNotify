var LocalStrategy = require('passport-local');
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
module.exports = function(passport) {
	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done){
        console.log("Inside Signup.js");
		findOrCreateUser = function() {
			User.findOne({'username':username}, function(err, user) {
				if(err) {
					console.log('Error in Sign Up' + err);
					return done(err);
				}
				if(user) {
					console.log('User already exists with username: ' + username);
					return done(null, false, req.flash('message', 'User Already exists'));
				} else {
					var newUser = new User();
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.param('email');
					newUser.first_name = req.param('first_name');
					newUser.last_name = req.param('last_name');
                    newUser.user_type = req.param('user_type');
					newUser.save(function(err) {
						if(err) {
							console.log('Error in saving User : ' + err);
							throw err;
						}
						console.log('User registration successful');
						return done(null, newUser);
					});
				}
			});
		};
        process.nextTick(findOrCreateUser);
	}));
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}