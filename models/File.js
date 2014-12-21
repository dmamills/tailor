var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
	path: { type:String,require:true },
	user_id: { type:mongoose.Schema.ObjectId,require:true },
});

module.exports = mongoose.model('File',FileSchema);
