
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