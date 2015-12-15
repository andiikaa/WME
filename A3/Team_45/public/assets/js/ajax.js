
var visibleColumnNr = [];

//document loaded
$(document).ready(initialize());

/********************************************************************************
********************************* SHOW HIDE BUTTONS *****************************
*********************************************************************************/
$( "#show_selected_prop" ).click(function() {
	 var cur = getColumnNumber();
	showHideTableColumn(cur, false);	
});

$( "#hide_selected_prop" ).click(function() {
  	var cur = getColumnNumber();
	showHideTableColumn(cur, true);	
});

//gets the column number from the current selected index in the selection section
function getColumnNumber(){
	var sel = document.getElementById("prop_selection");
	var cur = sel.options[sel.selectedIndex].value;
	return ++cur;	
}

/********************************************************************************
********************************* FORMS *****************************************
*********************************************************************************/

//Submit filter form
$("#country_filter").submit(function(event) {
    event.preventDefault();
	filter();
});

//Delete form
$("#country_delete").submit(function(event) {
    event.preventDefault();
	var id = document.getElementById("country_delete_id").value;
	
	if(id != null)
		id = id.trim();
	
	if(id == "" || id == null)
		deleteLastItem();
	else
		deleteItemWithId(id);	
});

// Post new entry form
$("#country_add").submit(function(event) {
    event.preventDefault();	
	var name = document.getElementById("country_name").value;
	var birth = document.getElementById("country_birth").value;
	var cell = document.getElementById("country_cellphone").value;
	postNewItem(name, birth, cell);	
});

/********************************************************************************
********************************* REQUESTS ***************************************
*********************************************************************************/

//the actual async post
function postNewItem(name, birth, cell){
		$.ajax("http://localhost:3000/items", {
		data: '{ "country_name": "' + name + '", "country_birth": "' + birth + '", "country_cellphone": "' + cell + '"}',
		contentType: "application/json", 
		method: "POST",
		success: refresh,
		error: handleResponseError
   });	
}

//deletes item with the given id
function deleteItemWithId(id){
	$.ajax("http://localhost:3000/items/" + id, {
		method: "DELETE",
		success: refresh,
		error: handleResponseError
   });		
}

//deletes last item stored in server db
function deleteLastItem(){
	$.ajax("http://localhost:3000/items", {
		method: "DELETE",
      success: refresh,
      error: handleResponseError
   });		
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


/********************************************************************************
********************************* PRIVATE METHODS ********************************
*********************************************************************************/

//shows the status message for 5 seconds
function showStatusMessage(message, isError){
	var container = document.getElementById("status_box");
	var st = document.getElementById("status_text");
	
	if(isError)
		container.style.backgroundColor = "red";
	else
		container.style.backgroundColor = "green";
	
	container.style.visibility = 'visible';
	st.innerHTML = message;
	
	setTimeout(function(){container.style.visibility = 'hidden'}, 5000);
}

//filters - receives all values if no filter is set
function filter(){
	var id = document.getElementById("country_filter_id").value;
	var range = document.getElementById("country_filter_range").value;
	
	var tBody = document.getElementById("table_body");
	removeAllChilds(tBody);
	
	if(!tryRange(range)){
		if(id == null || id.trim() == ""){
			receiveTable();
		}
		else{
			filterSingle(id);
		}
	}
	hideTableCols();
}

//Refreshs the table and shows status message for requests which are successful
function refresh(data){
	showStatusMessage(data, false);
	filter();
}

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
	receiveProps();
	receiveTable();
}

// fills table with single value
function fillSingle(data){
	var tBody = document.getElementById("table_body");
	removeAllChilds(tBody);	
	var row = document.createElement('tr');
	for(var prop in data){
        var cell = document.createElement('td');
        var cont = document.createTextNode(data[prop]);
        cell.appendChild(cont);
        row.appendChild(cell);
    }	
	tBody.appendChild(row);
	hideTableCols();
}

// fills the property section and the table header
function fillProps(data){
	var selection = document.getElementById("prop_selection");
	var thead = document.getElementById("table_head");
	
	removeAllChilds(thead);
	
	for(i = 0; i < data.length; i++){
		//table head
		var th = document.createElement("th");
		th.innerHTML = data[i];
		thead.appendChild(th);
		
		//selection
		var opt = document.createElement("option");		
		opt.value = i;		
		var txt = document.createTextNode(data[i]);
		opt.appendChild(txt);
		selection.appendChild(opt);
	}		
	
	hideTableColsInit(data.length);
}

//hides not used table cols and inits the visibility array
function hideTableColsInit(propCount){
	for(var i = 0; i < propCount; i++)
		visibleColumnNr.push(true);

	console.log("columns");
	console.log(visibleColumnNr);
	for(var i = 6; i < propCount; i++){
		if(i != 9){
			visibleColumnNr[i] = false;
			showHideTableColumn(i + 1, true);
		}
	}	
}

//hides the table cols specific to their settings in 'visibleColumnNr'
function hideTableCols(){
	for(var i = 0; i < visibleColumnNr.length; i++)
		showHideTableColumn(i + 1, !visibleColumnNr[i]);
}

//hide a table column
function showHideTableColumn(columnNr, hide){
	if(hide){
		$('#table_head th:nth-child(' + columnNr + ')').hide();
		$('#table_body td:nth-child(' + columnNr + ')').hide();
	}
	else{
		$('#table_head th:nth-child(' + columnNr + ')').show();
		$('#table_body td:nth-child(' + columnNr + ')').show();
	}
	visibleColumnNr[columnNr -1] = !hide;	
}

//removes all childs from the parent
function removeAllChilds(root){
	while (root.firstChild)
		root.removeChild(root.firstChild);	
}

//fills the table with the given data (array)
function fillTable(data){
	var tBody = document.getElementById("table_body");
	removeAllChilds(tBody);
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
	hideTableCols();
}

//handles error responses
function handleResponseError(jqXHR, textStatus, errorThrown){
	console.log("Error: " + errorThrown + ": " + jqXHR.responseText);	
	showStatusMessage(errorThrown + ": " + jqXHR.responseText, true);
}