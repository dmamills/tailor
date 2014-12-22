var exec = require('child_process').exec;
var async = require('async');
var File = require('../models/File');

module.exports = function(server,locals) {

	var io = require('socket.io')(server);
	//find all currently setup log files


	//on a new connection get the last 20 lines and send to socket
	io.on('connection',function(socket) {
		File.find({},function(err,files) {
			if(err)throw err;
			console.log(files);
			
			async.each(files,function(file,cb) {
				//convert to async each and emit for every log file	
				var len = (locals.inital_length) ? locals.inital_length : 20;
				var cmd = 'tail -n ' + len + ' ' + file.path;
				exec(cmd,function(err,stdout,stderr) {
					if(err) throw err;

					io.emit('init', {
						file:file._id,
						data:stdout
					});
				});

				//emit new file content to sockets
				var child = exec('tail -f ' + file.path);
				child.stdout.on('data',function(data) {
					io.emit('message',{
						file:file._id,
						data:data
					});
				});

				cb();		
			},function(err) {
				if(err) throw err;
			});
		});
	});

	return io;
};
