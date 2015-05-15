// commander.js
// Executes command on the system

"use strict";

require("shelljs/global");
var config = require("shelljs").config;
var path = require("path");
var config = require("./config");

// Util - user home path
var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

var Commander = function()
{

};

Commander.prototype.shutdown = function()
{
	exec("sudo halt", { async: true });
};

Commander.prototype.reboot = function()
{
	exec("sudo reboot", { async: true });
};

Commander.prototype.openPorts = function()
{
	var output = "";
	var ports = config.current.NATPorts;

	for(var i = 0; i < ports.length; i++)
	{
		output += exec("upnpc -a `ip route get 8.8.8.8 | awk '{ print $NF; exit }'` "+ ports[i].internal +" "+ ports[i].external +" "+ ports[i].protocol + " | sed -e 1b -e '$!d'").output;
	}

	return output;
};

var commander = new Commander();

module.exports = commander;