// api.js
"use strict";

var express = require("express");
var commander = require("./commander");

var api = express.Router();

api.route("/reboot").get(function(req, res)
	{
		commander.reboot();
		res.status(200).send("OK");
	});

api.route("/shutdown").get(function(req, res)
	{
		commander.shutdown();
		res.status(200).send("OK");
	});

api.route("/openports").get(function(req, res)
	{
		var output = {
			"output": commander.openPorts()
		}
		res.status(200).jsonp(output);
	});

module.exports = api;