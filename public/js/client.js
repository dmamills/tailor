$(document).ready(function() {

	var socket = io();
	var outputEl = document.getElementById('terminal-body');
	socket.once('init',function(data) {
		var a = data.split("\n");
		for(var i = 0; i < a.length;i++) {
			outputEl.innerHTML += "<p>" + a[i] + "</p>";
		}

		outputEl.scrollTop = outputEl.scrollHeight;
	});

	socket.on('message',function(data) {
		var a = data.split("\n");
		for(var i = 0; i < a.length;i++) {
			outputEl.innerHTML += "<p>" + a[i] + "</p>";
		}

		outputEl.scrollTop = outputEl.scrollHeight;
	});
});
