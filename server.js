#!/usr/bin/env node
"use strict";

var async = require("async");
var express = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");

// redirect http to https for aquila-server
require("./redirector").startRedirector();

var port = process.env.PORT || 5555;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'ejs'); // set up ejs for templating

var router = express.Router();

router.get("/", function(req, res)
	{
		res.render("index.html");
	});

app.use(router);
app.use("/api", require("./api"));

app.listen(port, function()
	{
		console.log("hub-manager server running on http://localhost:" + port);
	})
