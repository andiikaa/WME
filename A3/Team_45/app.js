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
****************************** csv2json **********************************
**************************************************************************/
/*
Documentation https://github.com/Keyang/node-csvtojson
*/

var jsonTable; //stores all items
var properties; //stores all properties
var lastId = 1; //the last index used

var converter = new Converter({
  checkType:false,
  delimiter:";"
});

//reads the csv and set the properties and the last id
converter.on("end_parsed", function (jsonArray) {
	jsonTable = jsonArray;
	properties = new Array();
	
	if(jsonTable.length == 0 )
		return;
	
	//remove the trailing zeros
	for(var i = 0; i < jsonTable.length; i++)
		jsonTable[i].id = removeTrailingZero(jsonTable[i].id);
	
	for(var prop in jsonTable[0])
		properties.push(prop);
		
	lastId = parseInt(jsonTable[jsonTable.length - 1].id);
});

require("fs").createReadStream("public/world_data.csv").pipe(converter);

/**************************************************************************
********************** handle HTTP METHODS ********************************
**************************************************************************/

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
	else
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
	else
		res.send(response);
});

// GET /properties
app.get('/properties', function (req, res) {
  res.send(properties);
});

// GET /properties/num
app.get('/properties/:int(\\d+)', function (req, res) {
	var id = parseInt(req.params.int);
	if(id >= properties.length)
		res.status(404).send("No such property with id '" + id + "' found");
	else
		res.send(properties[id]);
	//console.log("Prop with id '%d' : '%s' ", id, response);
});

// POST /items
app.post('/items', function (req, res) {
	console.log("post data: " + req.body);
	
	var name = req.body.country_name;
	var birth = req.body.country_birth;
	var cell = req.body.country_cellphone;
	
	if(name == null || birth == null || cell == null){
		res.status(400).send("One or more arguments missing.");
		return;
	}	
	console.log("last id: " + lastId);
	lastId++;
	//all in same format - thats why the id as string
	var newItem = createItem(lastId.toString(), name, birth, cell);
	jsonTable.push(newItem);		
	console.log("Added country { " + name + " } to list !");
	res.send("Added country { " + name + " } to list !");
});

// DELETE /items
app.delete('/items', function (req, res) {
	var lastIndex = jsonTable.length - 1;
	if(lastIndex >= 0){
		var item = jsonTable[lastIndex];
		jsonTable.splice(lastIndex, 1);
		console.log("Deleted last country:{" + item["name"] + "} !");
		res.send("Deleted last country:{" + item["name"] + "} !");
	}
	else{
		console.log("no items in database");
		res.status(404).send("no items in database");
	}
});

// DELETE /items/id
app.delete('/items/:id([0-9]+)', function (req, res) {
	var id = req.params.id;
	var item = deleteItemWithId(id);
	if(item != null){
		console.log("Deleted country:{" + item["name"] + "} !");
		res.send("Deleted country:{" + item["name"] + "} !");
	}
	else{
		console.log("no such id {" + id + "} in database");
		res.status(404).send("no such id {" + id + "} in database");
	}
});

/**************************************************************************
********************** Private METHODS ************************************
**************************************************************************/

//gets a item by a id
function getItemById(id){
	for(var i = 0; i < jsonTable.length; i++){		
		if(jsonTable[i]["id"] == id){
			return jsonTable[i];
		}
	}
		return null;
}

//gets the range list
function getRangeList(start, end){
	var tmp = new Array();
	for(var i = 0; i < jsonTable.length; i++){
		var tmpId = jsonTable[i]["id"];
		if(tmpId >= start && tmpId <= end)
			tmp.push(jsonTable[i]);
	}
	return tmp;	
}

function removeTrailingZero(value){
	var val = value.replace(/^[0]+/g, '');
	//console.log("Convert from '" + value + "' to '" + val + "'");
	if(val == "")
		return 0;
	return parseInt(val);
}

function createItem(vId, vName, vBirth, vCell){
	return {id:	vId,
	name: vName,
	birth_rate_per_1000: vBirth,
	cell_phones_per_100: vCell,
	children_per_woman: "",
	electricity_consumption_per_capita: "",
	gdp_per_capita: "",
	gdp_per_capita_growth: "",
	inflation_annual: "",
	internet_user_per_100: "",
	life_expectancy: "",
	military_expenditure_percent_of_gdp: "", 
	gps_lat: "",
	gps_long: ""};
}

//Deletes an item with the given id. returns the item wich was deleted, 
//otherwise null if no element with the given id exists.
function deleteItemWithId(id){
	for(var i = 0; i < jsonTable.length; i++){
		if(id == jsonTable[i]["id"]){
			var val = jsonTable[i];
			jsonTable.splice(i, 1);
			return val;
		}
	}
	return null;	
}


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});