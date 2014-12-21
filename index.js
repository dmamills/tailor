var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var passport = require('./lib/passport').passport;
var ensureAuthenticated = require('./lib/passport').ensureAuthenticated;

// load config file
var locals = require('./config.json');
var authRoutes = require('./routes/auth')(passport,locals);
var configRoutes = require('./routes/config')(passport,locals);

require('./lib/database')(locals.connectionString);

var app = express();

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	secret: locals.session_secret,
	store: new MongoStore({
		db:'tailor'
	})
}));


var FIRST_RUN = true;

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/',ensureAuthenticated,function(req,res) {
	res.render('content',locals);
});

app.use('/',authRoutes);
app.use('/config',configRoutes);

var server = app.listen(8000);
var io = require('./lib/socket')(server,locals);

io.listen(3000);
console.log('server started on port 8000 watching log: ' + locals.logfile);
