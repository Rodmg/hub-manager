"use strict";

var async = require("async");
var express = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");

var commander = require("./commander");

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
		var output = commander.openPorts();
		res.status(200).send(output);
	});

app.use(router);
app.use("/api", api);

app.listen(port, function()
	{
		console.log("hub-manager server running on http://localhost:" + port);
	})
