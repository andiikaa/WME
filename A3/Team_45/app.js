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
function getItemById(id){
	for(var i = 0; i < jsonTable.length; i++){		
		if(jsonTable[i]["id"] == id){
			return jsonTable[i];
		}
	}
		return null;
}

function getRangeList(start, end){
	var tmp = new Array();
	for(var i = 0; i < jsonTable.length; i++){
		var tmpId = jsonTable[i]["id"];
		if(tmpId >= start && tmpId <= end)
			tmp.push(jsonTable[i]);
	}
	return tmp;	
}


// GET /items
app.get('/items', function (req, res) {
  res.send(jsonTable);
});

// GET /items/id
app.get('/items/:id([0-9]+)', function (req, res) {
	var id = req.params.id;
	var response = getItemById(id);
	console.log("item with id '%s' : ", id, response);
	if(response == null)
		res.status(404).send("no such id {" + id + "} in database");
	res.send(response);
});

// GET /items/id/id
app.get('/items/:start([0-9]+)/:end([0-9]+)', function (req, res) {
	var start = req.params.start;
	var end = req.params.end;
	var response;
	
	if(start == end)
		response = getItemById(start);		
	else if(start > end)
		response = getRangeList(end, start);
	else
		response = getRangeList(start, end);
	if(response == null || response.length == 0)
		res.status(404).send("Range not possible.");
	
	res.send(response);
});

// GET /properties
app.get('/properties', function (req, res) {
  res.send(properties);
});

// GET /properties/num
app.get('/properties/:int(\\d+)', function (req, res) {
	var id = parseInt(req.params.int);
	var response;
	if(id >= properties.length)
		response = "error";
	else
		response = properties[id];
	//console.log("Prop with id '%d' : '%s' ", id, response);
	res.send(response);
});

// ####################################### TODO
// POST /items
app.post('/items', function (req, res) {
	// send status: Added country { name } to list !	
	
  res.send('POST request to the homepage');
});

// ####################################### TODO
// DELETE /items
app.delete('/items', function (req, res) {
	// Deleted last	country:{name}!
  res.send('POST request to the homepage');
});

// ####################################### TODO
// DELETE /items/id
app.delete('/items/:id([0-9]+)', function (req, res) {
	// "no such id {" + id + "} in database"
  res.send('POST request to the homepage');
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});