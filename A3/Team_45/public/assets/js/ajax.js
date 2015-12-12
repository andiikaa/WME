
$(document).ready(initialize());

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
      success: fillTable,
      error: handleResponseError
   });		
}

function filter(){
	filterSingle("005");	
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

/*
function fillTable(data){
	alert("data received");
	console.log("Data received: ");
	console.log(data);	
}*/