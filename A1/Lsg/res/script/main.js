
/*
Toggles the visibility of a table column.
@param{col_id} the id of a column.

Collapse does not work in chrome (for this exercise not necessary).

https://code.google.com/p/chromium/issues/detail?id=174167
*/
function toggle_column(col_id){
         var col = document.getElementById(col_id);
         if(col){
           var vis = col.style.visibility == 'collapse';
           col.style.visibility = vis? "visible" : "collapse";
         }
}