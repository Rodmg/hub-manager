// commander.js
// Executes command on the system

"use strict";

require("shelljs/global");
var config = require("shelljs").config;
var path = require("path");

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
	output += exec("upnpc -a `ip route get 8.8.8.8 | awk '{ print $NF; exit }'` 80 80 TCP").output;
	output += exec("upnpc -a `ip route get 8.8.8.8 | awk '{ print $NF; exit }'` 443 443 TCP").output;

	return output;
};

var commander = new Commander();

module.exports = commander;