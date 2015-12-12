// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/
/*
Documentation https://github.com/Keyang/node-csvtojson
*/
var jsonTable;
var properties;
var converter = new Converter({
  checkType:false,
  delimiter:";"
});

converter.on("end_parsed", function (jsonArray) {
	jsonTable = jsonArray;
	properties = new Array();
	
	if(jsonTable.length == 0 )
		return;
	for(var prop in jsonTable[0])
		properties.push(prop);		
});

require("fs").createReadStream("public/world_data.csv").pipe(converter);

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

// GET Handlers
app.get('/items', function (req, res) {
  res.send(jsonTable);
});

app.get('/items/id', function (req, res) {
  res.send('get item with this id');
});

app.get('/items/id/id', function (req, res) {
  res.send('get item with this id');
});

app.get('/properties', function (req, res) {
  res.send(properties);
});

app.get('/properties/:int(\\d+)', function (req, res) {
	var id = parseInt(req.params.int);
	var response;
	if(id >= properties.length)
		response = "error";
	else
		response = properties[id];
	console.log("Prop with id '%d' : '%s' ", id, response);
	res.send(response);
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});