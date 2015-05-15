// sesamo.js
// Opens ports via upnp nat service

"use strict";

var natUpnp = require('nat-upnp');

var Sesamo = function(mapping)
{
	var self = this;

	self.mapping = mapping;
	self.status = "Uninitialized";
	self.error = null;
	self.client = null;
};

Sesamo.prototype.open = function(callback)
{
	var self = this;

	self.client = natUpnp.createClient();

	// First unmap any preexisting mapping
	// self.close(function(err)
	// 	{
	// 		if(err) console.log("Unmapping error: ", err);

			self.client.portMapping(self.mapping, function(err)
			{
				if(err)
				{
					self.status = "Error";
					self.error = err;
				}
				else
				{
					self.status = "Open";
				}
				self.client.close();
				callback(err);
			});
		// });

	
};

Sesamo.prototype.close = function(callback)
{
	var self = this;
	
	self.client = natUpnp.createClient();

	self.client.portUnmapping(self.mapping, function(err)
		{
			if(err)
			{
				self.status = "Error";
				self.error = err;
			}
			else
			{
				self.status = "Closed";
			}
			self.client.close();
			callback(err);
		});
};

module.exports = Sesamo;