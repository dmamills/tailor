var fs = require('fs');
var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//auth stuff
var passport = require('./lib/passport').passport;
var ensureAuthenticated = require('./lib/passport').ensureAuthenticated;

// load config file
var locals = require('./locals.json');

var app = express();

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	  secret: 'sowutidontcareatall'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/',ensureAuthenticated,function(req,res) {
	res.status(200).render('content',locals);
});

app.get('/login',function(req,res) {
	res.render('login',locals);
});

app.get('/logout', function(req,res) {
	req.logout();
	res.redirect('/login');
});
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }));

var server = app.listen(8000);
var io = require('./lib/socket')(server,locals);

io.listen(3000);
console.log('server started on port 8000 watching log: ' + locals.logfile);
