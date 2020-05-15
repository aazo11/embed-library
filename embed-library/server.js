"use strict";

exports.__esModule = true;
require("zone.js/dist/zone-node");
require("reflect-metadata");
var platform_server_1 = require("@angular/platform-server");
var express = require("express");
var fs_1 = require("fs");
var core_1 = require("@angular/core");
const PORT = Number(process.env.PORT) || 8080;
//var AppServerModuleNgFactory = require('./dist/embed-library/server/main').AppServerModuleNgFactory;

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/embed-library/server/main');

core_1.enableProdMode();
var app = express();

var indexHtml = fs_1.readFileSync(__dirname + '/dist/embed-library/browser/index.html', 'utf-8').toString();

app.get('/', function (req, res) {
  console.log("********in slash route");
  res.send(indexHtml);
});



app.route('/library').get(function (req, res) {
  console.log("MIAAAH");
  platform_server_1.renderModuleFactory(AppServerModuleNgFactory, { document: indexHtml, url: req.url }).then(function (html) {
      res.status(200).send(html);
  })["catch"](function (err) { console.log(err); res.status(200).send('<h1>main.js line 2580 declare Hammer</h1>'); });
});


app.use(express.static(__dirname + '/dist/embed-library/browser/'));

/*
app.get('/settings', function (req, res) {
    res.send(indexHtml);
});
*/



app.get('*', function (req, res) {
    console.log("in star route");
    res.send(indexHtml);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
 });
