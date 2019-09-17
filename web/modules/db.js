//
//	mongodb
//

var mongoose = require('mongoose')
var config = {
	// mongodb://[username:password@]host1[:port1][,host2[:port2],…[,hostN[:portN]]][/[database][?options]]
	mongouri: process.env.ANT_MONGO_URI || 'mongodb://127.0.0.1/ant',
}
var mongodb = mongoose.createConnection(config['mongouri'])

module.exports = {
	cache: {},
	init: function(name, schema) {
		var _schema = new mongoose.Schema(schema);
		this.cache[name] = mongodb.model(name, _schema);
		return this.cache[name];
	},
	get: function(name) {
		return this.cache[name];
	},
	objId: function(name) {
		return {
			type: mongoose.Schema.Types.ObjectId,
			ref: name
		}
	}
}
