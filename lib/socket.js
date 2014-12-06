var exec = require('child_process').exec;

module.exports = function(server,locals) {

	var io = require('socket.io')(server);

	//on a new connection get the last 20 lines and send to socket
	io.on('connection',function(socket) {
		exec('tail -n 20 ' + locals.logfile,function(err,stdout,stderr) {
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
