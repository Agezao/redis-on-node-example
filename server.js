const redis    = require('redis'),
	  bluebird = require('bluebird');
const redisClient = redis.createClient({host : '192.168.99.100', port : 32768});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let SeparatorTile = function(text) {
	console.log("------------------------");
	console.log(text);
	console.log("------------------------");
}

redisClient.on('ready',function() { });

redisClient.on('error', function(err) {
	console.log("Error in Redis");
	console.log(err);
});

/////
//Cleaning test objects
redisClient.delAsync(['language', 'user']).error(err => {console.log(err)});

/////
// Simple Object
redisClient.setAsync("language","nodejs", "EX", 2).error(err => { console.log(err); });

redisClient.getAsync("language")
	.then(reply => {
		console.log(reply);
	})
	.error(err => { console.log(err); });

/////
// Complex Objects
redisClient.hsetAsync("user", "name", "Age").error(err => { console.log(err); });

redisClient.hgetallAsync("user")
	.then(reply => {
		console.log(reply);
	})
	.error(err => { console.log(err); });

redisClient.hsetAsync("user", "email", "0800.grc@gmail.com").error(err => { console.log(err); });

redisClient.hgetallAsync("user")
	.then(reply => {
		console.log(reply);
	})
	.error(err => { console.log(err); });


/////
// Checking Expiration
setTimeout(() => {
	redisClient.getAsync("language").then(reply => { console.log(reply ? reply : 'Expired key'); });
}, 2100);