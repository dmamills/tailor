var http = require('http')
var url = require('url')
var fs = require('fs');
var exec = require('child_process').exec;
var jade = require('jade');

//load any extra variables to pass to jade
var locals = require('./locals.json');

var compile = jade.compileFile('views/content.jade',{
	pretty:true
});

if(process.argv.length < 3) {
	console.log('USAGE: tailor <log file>');
	process.exit(1);
}

var LOG_FILE = locals.filename = process.argv[2];

if(!fs.existsSync(LOG_FILE)) {
	console.log('Log file: ' + LOG_FILE + ' not found.');
	process.exit(1);
}

//compile the client view
var compiledView = compile(locals);

var server = http.createServer(function(req,res) {

	var uri = url.parse(req.url).pathname;

	if(/.js$/.test(uri)) {
		res.writeHead(200,{"Content-Type":"text/javascript"});
		fs.createReadStream(uri.substr(1)).pipe(res);
	} else if(uri === '/') {
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(compiledView);
	} else if(/.css$/.test(uri)) {
		res.writeHead(200,{"Content-Type":"text/css"});
		fs.createReadStream(uri.substr(1)).pipe(res);
	} else {
		res.writeHead(400,{"Content-Type":"text/plain"});
		res.end('404\n');
	}
});

var io = require('socket.io')(server);

//on a new connection get the last 20 lines and send to socket
io.on('connection',function(socket) {
	exec('tail -n 20 ' + LOG_FILE,function(err,stdout,stderr) {
		if(err) throw err;
		io.emit('init',stdout);
	});
});

//emit new file content to sockets
var child = exec('tail -f ' + LOG_FILE);
child.stdout.on('data',function(data) {
	io.emit('message',data);
});

server.listen(8000);
io.listen(3000);
console.log('server started on port 8000 watching log: ' + LOG_FILE);
