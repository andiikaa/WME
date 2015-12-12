
//document loaded
$(document).ready(initialize());

//Submit filter form
$("#country_filter").submit(function(event) {
    event.preventDefault();
	var id = document.getElementById("country_filter_id").value;
	var range = document.getElementById("country_filter_range").value;
	if(!tryRange(range))
		filterSingle(id);
});

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

function receiveProps(){
	$.ajax("http://localhost:3000/properties", {
      success: fillProps,
      error: handleResponseError
   });	
}

function receiveTable(){
	$.ajax("http://localhost:3000/items", {
      success: fillTable,
      error: handleResponseError
   });
}

function filterRange(start, end){
	$.ajax("http://localhost:3000/items/" + start + "/" + end, {
      success: fillTable,
      error: handleResponseError
   });	
}

function filterSingle(id){
	$.ajax("http://localhost:3000/items/" + id, {
      success: fillSingle,
      error: handleResponseError
   });		
}

function fillSingle(data){
	var tBody = document.getElementById("table_body");
	
	while (tBody.firstChild)
		tBody.removeChild(tBody.firstChild);
	
	var row = document.createElement('tr');
	for(var prop in data){
        var cell = document.createElement('td');
        var cont = document.createTextNode(data[prop]);
        cell.appendChild(cont);
        row.appendChild(cell);
    }	
	tBody.appendChild(row);
}

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

function fillTable(data){
	var tBody = document.getElementById("table_body");
	
	while (tBody.firstChild)
		tBody.removeChild(tBody.firstChild);
	
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

function handleResponseError(jqXHR, textStatus, errorThrown){
	console.log("Error happened");
}