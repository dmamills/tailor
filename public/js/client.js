$(document).ready(function() {

	var outputEl = document.getElementById('terminal-body');
	var client = new TailorClient(function(data) {
		var a = data.split("\n");
		for(var i = 0; i < a.length;i++) {
			outputEl.innerHTML += "<p>" + a[i] + "</p>";
		}

		outputEl.scrollTop = outputEl.scrollHeight;
	}, function(data) {
		var a = data.split("\n");
		for(var i = 0; i < a.length;i++) {
			outputEl.innerHTML += "<p>" + a[i] + "</p>";
		}

		outputEl.scrollTop = outputEl.scrollHeight;
	});
});
