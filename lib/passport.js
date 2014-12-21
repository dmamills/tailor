var passport = require('passport');
var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({username:username},function(err,user) {
		if(err) {
			done(err);
		}

		if(!user) {
			done(null,false);
		} else {
			user.comparePassword(password,function(err,isMatch) {
				if(err) done(err);
				if(isMatch) {
					done(null,user._id);
				} else {
					done(null,false);
				}
			});
		}
	});
}));

passport.serializeUser(function(id,done) {
	User.findById(id,function(err,user) {
		if(err)throw err;
		done(null,user._id);
	});
});

passport.deserializeUser(function(id,done) {
	User.findById(id,function(err,user) {
		if(err) done(err);
		done(null,user);
	});
});

module.exports.passport = passport;
module.exports.ensureAuthenticated = function(req,res,next) {

	if (req.isAuthenticated()) { return next(); }

	User.count(function(err,count) {
		if(err) throw err;

		if(count === 0) {
			res.render('setup',{});
		} else {
			res.redirect('/login');
		}
	});
};
