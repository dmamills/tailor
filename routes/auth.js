var express = require('express');

module.exports = function(passport,locals) {

	var router = express.Router();

	router.get('/login',function(req,res) {
		res.render('login',locals);
	});

	router.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/login');
	});

	router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }));

	return router;
}
