
//document loaded
$(document).ready(initialize());

//Submit filter form
$("#country_filter").submit(function(event) {
    event.preventDefault();
	var id = document.getElementById("country_filter_id").value;
	var range = document.getElementById("country_filter_range").value;
	
	var tBody = document.getElementById("table_body");
	clearTbody(tBody);
	
	if(!tryRange(range))
		if(id == null || id.trim() == ""){
			receiveTable();
			return;
		}
	filterSingle(id);
});

//tries to get the given range.
//returns false if range field is empty or in wrong format
function tryRange(range){
	var rangeSplit;
	if(range == null)
		return false;
	
	range = range.trim();
	rangeSplit = range.split("-");
	if(rangeSplit.length != 2)
		return false;
	filterRange(rangeSplit[0], rangeSplit[1]);
	return true;	
}

function initialize(){
	receiveTable();
	receiveProps();
}

// receive properties
function receiveProps(){
	$.ajax("http://localhost:3000/properties", {
      success: fillProps,
      error: handleResponseError
   });	
}

// receive the full table
function receiveTable(){
	$.ajax("http://localhost:3000/items", {
      success: fillTable,
      error: handleResponseError
   });
}

// sends request for filtered table
function filterRange(start, end){
	$.ajax("http://localhost:3000/items/" + start + "/" + end, {
      success: fillTable,
      error: handleResponseError
   });	
}

// sends request for filtered table
function filterSingle(id){
	$.ajax("http://localhost:3000/items/" + id, {
      success: fillSingle,
      error: handleResponseError
   });		
}

// fills table with single value
function fillSingle(data){
	var tBody = document.getElementById("table_body");
	clearTbody(tBody);	
	var row = document.createElement('tr');
	for(var prop in data){
        var cell = document.createElement('td');
        var cont = document.createTextNode(data[prop]);
        cell.appendChild(cont);
        row.appendChild(cell);
    }	
	tBody.appendChild(row);
}

// fills the property section
function fillProps(data){
	var selection = document.getElementById("prop_selection");
	for(i = 0; i < data.length; i++){
		var opt = document.createElement("option");
		opt.value = i;
		var txt = document.createTextNode(data[i]);
		opt.appendChild(txt);
		selection.appendChild(opt);
	}		
}

//clears the given table body
function clearTbody(body){
	while (body.firstChild)
		body.removeChild(body.firstChild);	
}

//fills the table with the given data (array)
function fillTable(data){
	var tBody = document.getElementById("table_body");
	clearTbody(tBody);
	for(var i = 0; i < data.length; i++){
        var row = document.createElement('tr');
        for(var prop in data[i]){
            var cell = document.createElement('td');
            var cont = document.createTextNode(data[i][prop]);
            cell.appendChild(cont);
            row.appendChild(cell);
        }
        tBody.appendChild(row);
    }
}

//handles error responses
function handleResponseError(jqXHR, textStatus, errorThrown){
	console.log("Error happened");
}