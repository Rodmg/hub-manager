// dbManager.js
"use strict";

require("shelljs/global");
var config = require("shelljs").config;
var path = require("path");

var config = require("./config");

// Util - user home path
var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

var DBManager = function()
{
	var self = this;
	self.bkpIntervalID = null;
};

DBManager.prototype.backupDB = function()
{
	// TODO log this
	console.log("Backing up database");
	exec("mongodump -d aquila-server -o " + path.join(home, ".aquila-server/backup/"), { async: true });
};

DBManager.prototype.scheduleBackups = function()
{
	var self = this;
	var interval = config.current.dbBackupInterval;
	if(self.bkpIntervalID) clearInterval(self.bkpIntervalID);
	self.bkpIntervalID = setInterval(self.backupDB, interval);
};

DBManager.prototype.restoreDB = function(callback)
{
	// TODO log this
	console.log("Restoring database");
    exec("mongorestore --drop " + path.join(home, ".aquila-server/backup/aquila-server"), function(code, output)
    	{
    		console.log("Database restored");
    		if(callback) callback();
    	});
};