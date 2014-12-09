var exec = require('child_process').exec;

module.exports = function(server,locals) {

	var io = require('socket.io')(server);

	//on a new connection get the last 20 lines and send to socket
	io.on('connection',function(socket) {
		var len = (locals.inital_length) ? locals.inital_length : 20;
		var cmd = 'tail -n ' + len + ' ' + locals.logfile;
		console.log(cmd);
		exec(cmd,function(err,stdout,stderr) {
			if(err) throw err;
			io.emit('init',stdout);
		});
	});

	//emit new file content to sockets
	var child = exec('tail -f ' + locals.logfile);
	child.stdout.on('data',function(data) {
		io.emit('message',data);
	});

	return io;
};
