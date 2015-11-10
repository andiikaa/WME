
/*
Toggles the visibility of a table column.
@param{col_id} the id of a column.

Collapse does not work in chrome (for this exercise not necessary).

https://code.google.com/p/chromium/issues/detail?id=174167
*/
function toggle_column(col_id){
         var col = document.getElementById(col_id);
         var vis = col.style.visibility == 'collapse';
         col.style.visibility = vis? "visible" : "collapse";
}


/*
adding table rows. only for testing.
*/
function add_table_row(table_id){
         var tbl = document.getElementById(table_id);
         var tbod = tbl.getElementsByTagName("tbody")[0];

         for(var i = 0; i < 25; i++){
                 var row = document.createElement('tr');
                 for(var k = 0; k < 7; k++){
                         var cell = document.createElement('td');
                         var cont = document.createTextNode("Test" + k);
                         cell.appendChild(cont);
                         row.appendChild(cell);
                 }
                 tbod.appendChild(row);
         }
}

/*
Uses shakersort.
https://de.wikipedia.org/wiki/Shakersort

@param{table_id} id of the table which should be sorted
@param{type} 0 for asc, 1 for desc
*/
function sort(table_id, col_nbr, type){
         var tbl = document.getElementById(table_id);
         var tbod = tbl.getElementsByTagName("tbody")[0];
         var rows = tbod.getElementsByTagName("tr");
         shakersort(rows, col_nbr, type);
}

/*
should be a simple impl of shakersort

@param{rows} table rows which should be sorted
@param{col_nbr} column which should be compared
@param{type} 0 for asc, 1 for desc
*/
function shakersort(rows, col_nbr, type){
         var end = rows.length - 2;
         var swapped = true;

         while(swapped){
                 swapped = false;
                 for(var i = 0; i < end + 1; i++){
                         var cmp = compare_row(rows[i], rows[i + 1], col_nbr);
                         if(cmp < 0 && type == 0){
                                 swap(rows[i], rows[i + 1]);
                                 swapped = true;
                         }
                         if(cmp > 0 && type == 1){
                                 swap(rows[i], rows[i + 1]);
                                 swapped = true;
                         }
                 }
                 if(!swapped){
                         break;
                 }
                 swapped = false;
                 for(var i = end;  i > -1; i--){
                         var cmp = compare_row(rows[i], rows[i + 1], col_nbr);
                         if(cmp < 0 && type == 0){
                                swap(rows[i], rows[i + 1]);
                                swapped = true;
                         }
                         if(cmp > 0 && type == 1){
                                swap(rows[i], rows[i + 1]);
                                swapped = true;
                         }
                 }
         }
}

/*
Swapping nodes e.g. table rows
*/
function swap(row1, row2){
         row2.parentNode.insertBefore(row1, row2.nextSibling);
}

/*
Compares 2 rows in the given col number.
Returns -1 if row1 is sorted before row2
@param{col_nbr} the column which should be compared in the two rows
*/
function compare_row(row1, row2, col_nbr){
         var val1 = row1.cells[col_nbr].firstChild.nodeValue;
         var val2 = row2.cells[col_nbr].firstChild.nodeValue;
         return val1.localeCompare(val2);
}