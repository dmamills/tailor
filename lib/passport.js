var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
	//console.log('strategy callback');
	if(username === 'mills' && password === 'password') {
		//console.log('match');
		done(null,username);
	} else {
		//console.log('no match');
		done(null,false);
	}
}));

passport.serializeUser(function(id,done) { 
	//console.log('serialize: ' + id);
	done(null,id); 
});

passport.deserializeUser(function(id,done) {
	//console.log('deserialize: ' + id);
	if(id) {
		done(null,id);
	}
});


module.exports.passport = passport;
module.exports.ensureAuthenticated = function(req,res,next) {
	  if (req.isAuthenticated()) { return next(); }
	    res.redirect('/login');
};
