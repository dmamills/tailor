$(document).ready(function() {
	var client = new TailorClient(function(data) {
		var el = document.getElementById('log-file-'+data.file);
		var a = data.data.split("\n");
		for(var i = 0; i < a.length;i++) {
			el.innerHTML += "<p>" + a[i] + "</p>";
		}

		el.scrollTop = el.scrollHeight;
	}, function(data) {
		var el = document.getElementById('log-file-'+data.file);
		var a = data.data.split("\n");
		for(var i = 0; i < a.length;i++) {
			el.innerHTML += "<p>" + a[i] + "</p>";
		}

		el.scrollTop = el.scrollHeight;
	});
});
