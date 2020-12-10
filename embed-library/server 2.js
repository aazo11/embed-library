"use strict";

exports.__esModule = true;
require("zone.js/dist/zone-node");
require("reflect-metadata");

var express = require("express");
var fs_1 = require("fs");
var core_1 = require("@angular/core");
const PORT = Number(process.env.PORT) || 8080;
//var platform_server_1 = require("@angular/platform-server");
//var AppServerModuleNgFactory = require('./dist/CallYourCongressperson-server/main').AppServerModuleNgFactory;
core_1.enableProdMode();
var app = express();

var indexHtml = fs_1.readFileSync(__dirname + '/dist/embed-library/index.html', 'utf-8').toString();



app.get('/', function (req, res) {
   
    res.send(indexHtml);
});



app.use(express.static(__dirname + '/dist/embed-library/'));



app.get('*', function (req, res) {
    console.log("in star route");
    res.send(indexHtml);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
 });
