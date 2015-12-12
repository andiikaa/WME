
$(document).ready(receiveTable());

function receiveTable(){
	$.ajax("http://localhost:3000/items", {
      success: fillTable,
      error: handleResponseError
   });
}

function fillTable(data){
	console.log(data);	
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