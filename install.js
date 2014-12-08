var prompt = require('prompt');
var mongoose = require('mongoose');
var User = require('./models/User');

var connectionString = 'mongodb://localhost:27017/tailor';
mongoose.connect(connectionString);
var db = mongoose.connection;

db.on('error',function(err) {
	console.log('error connecting to db');
	throw err;
});

var schema = {
    properties: {
      name: {
		description:'Enter Admin Username',
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      password: {
		description:'Enter Password',
        hidden: true
      },
	  confirm_password: {
		description:'Confirm Password',
		hidden:true
	  }
    }
  };

prompt.get(schema,function(err,results) {

	if(results.password !== results.confirm_password) {
		console.log('Passwords do not match.');
		process.exit(1);
	} 

	User.create({ username:results.name, password:results.password },function(err,user) {
		if(err)throw err;
		console.log('Created User: ' + results.name);
		process.exit();

	});
});
