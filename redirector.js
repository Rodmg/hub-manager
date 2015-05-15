#!/usr/bin/env node
"use strict";

// Redirect from http to https
var http = require('http');

module.exports.startRedirector = function()
{
	http.createServer(function (req, res) {
	    res.writeHead(301, { "Location": "https://" + req.headers['host'] /*+ req.url*/ });
	    res.end();
	}).listen(8000);
};
