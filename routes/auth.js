var express = require('express');
var User = require('../models/User');

module.exports = function(passport,locals) {

	var router = express.Router();

	router.get('/login',function(req,res) {
		res.render('login',locals);
	});

	router.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/login');
	});

	router.post('/setup',function(req,res) {
		User.count(function(err,count) {
			if(err) throw err;

			if(count > 0) {
				res.send('Setup has already been run.');
			} else {
				if(req.body.password !== req.body.confirm_password) {
					res.send('passwords do not match');
				} else {
					User.create({ username:req.body.username ,password:req.body.password},function(err) {
						if(err) throw err;
						res.redirect('/');
					});
				}
			}
		});
	});

	router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }));

	return router;
}
