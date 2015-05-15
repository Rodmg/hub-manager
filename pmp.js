var natpmp = require("nat-pmp");

var client = natpmp.connect("192.168.1.254");

client.externalIp(function(err, info)
	{
		if(err) return console.log("Error getting externalIp: ", err);
		console.log(info);
	});

client.portMapping({ private: 8080, public: 8080, ttl: 3600 }, function(err, info)
	{
		if(err) return console.log("Error mapping port: ", err);
		console.log(info);
	});