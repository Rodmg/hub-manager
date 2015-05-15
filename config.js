// config.js
"use strict";

require("shelljs/global");
var fs = require("fs");
var path = require("path");
// Util - user home path
var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
var configPath = path.join(home, ".hub-manager/config.json");

var Config = function()
{
    var self = this;
    self.current = {};

    // Load config on start
    // Initialize config if doesn't exist
    mkdir("-p", path.join(home, ".hub-manager"));

    if( !test("-e", configPath) )
    {
        console.log(" Creating default config.json...");
        cp("./config/config.json", configPath);
    }
     
    self.current = JSON.parse(fs.readFileSync(configPath));
};

Config.prototype.save = function()
{
    var self = this;
    fs.writeFileSync(configPath, JSON.stringify(self.current));
};

var config = new Config();

module.exports = config;