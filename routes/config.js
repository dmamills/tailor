var express = require('express');
var User = require('../models/User');
var File = require('../models/File');
var ensureAuthenticated = require('../lib/passport').ensureAuthenticated;

var router = express.Router();

module.exports = function(passport,locals) {
	router.get('/',ensureAuthenticated,function(req,res) {
		var userId = req.session.passport.user;

		User.findById(userId,function(err,user) {
			if(err) throw err;
			File.find({},function(err,files) {
				if(err) throw err;
				locals.user = user;
				locals.files = files;
				res.render('config',locals);
			});
		});
	});

	router.post('/',ensureAuthenticated,function(req,res) {
		var userId = req.session.passport.user;
		File.create({path:req.body.path,user_id:userId},function(err,file) {
			if(err) throw err;
			res.redirect('/config');
		});
	});

	router.post('/delete',ensureAuthenticated,function(req,res) {

	});

	return router;
};
