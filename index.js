'use strict';

var config = require('./config');
var MongoOplog = require('mongo-oplog');
var Twit = require('twit');

var oplog = MongoOplog('mongodb://'+config.mongodb.host+':'+config.mongodb.port+'/local', { ns: config.mongodb.ns }).tail();
var T = new Twit({
	consumer_key: config.twit.consumer_key,
	consumer_secret: config.twit.consumer_secret,
	access_token: config.twit.access_token,
	access_token_secret: config.twit.access_token_secret
});

oplog.on('insert', function (doc) {
	T.post('statuses/update', { status: 'hello world!'}, function (err, data, process) {
		console.log(data);
	});
});
