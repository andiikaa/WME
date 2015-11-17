<!DOCTYPE html>
<?php
        include("world_data_parser.php");
?>
<html>
<head>
         <meta charset="UTF-8">
         <meta name="description" content="WME Aufgabe 2">
         <meta name="keywords" content="PHP, XML">
         <meta name="author" content="Andre Kuehnert">
         <meta name="author" content="Fabian Boltz">

         <!-- CSS Reset-->
         <link rel="stylesheet" type="text/css" href="/Team_45/res/style/reset.css">

         <!-- Roboto Web Font over https connection, not local-->
         <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

         <!-- Font Awesome over https connection, not local -->
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

         <link rel="stylesheet" type="text/css" href="/Team_45/res/style/main.css">
         <script src="/Team_45/res/script/main.js" type="text/javascript"></script>

         <title>Aufgabe 2 - Print</title>
</head>
<body>
         <header id="menu_header">
                 <a id="link_logo" href="" title="Home"> Home </a>
                 <nav>
                 <ul>
                        <a href="/Team_45/index.html" class="header_link"> <li class="header_element"><i class="fa fa-list-ul"></i>  A1 - Table </li> </a>
                        <a href="/Team_45/php/parse/parse.php" class="header_link"> <li class="header_element"><i class="fa fa-list-ul"></i>  A2 - Parse </li> </a>
                        <a href="/Team_45/php/parse/save.php" class="header_link"> <li class="header_element"><i class="fa fa-list-ul"></i>  A2 - Save  </li> </a>
                        <a href="/Team_45/php/parse/print.php" class="header_link"> <li class="header_element"><i class="fa fa-list-ul"></i>  A2 - Print </li> </a>
                        <a href="" class="header_link"> <li class="header_element"><i class="fa fa-list-ul"></i>  A3 - REST </li> </a>
                        <a href="" class="header_link"> <li class="header_element"><i class="fa fa-list-ul"></i>  A4 - Vis  </li> </a>
                 </ul>
                 </nav>
         </header>

         <div class="data_table_container_2">
              <div class="show_hide_buttons">
              Show/Hide:
               <!--  <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_1')">ID</Button>   |
                 <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_2')">Country</Button>  |  -->
                 <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_3')">birth rate /1000</Button>    |
                 <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_4')">cellphones /100</Button>    |
                 <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_5')">children / woman</Button>   |
                 <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_6')">electric usage</Button>     |
                 <Button title="hide column" class="hide_column_button" onclick="toggle_column('data_table_col_7')">internet usage</Button>
              </div>

<?php
        //Inserts Data Table

        $parser = new WorldDataParser();
        $parsed = $parser->parseCSV(WORLD_DATA_PATH);
        $save_result = $parser->saveXML($parsed);
        $print = $parser->printXML(XML_PATH, XSL_PATH);

        echo $print;

?>
         </div>

         <footer id="group_footer">
                 <div class="footer_left_container">
                         Copyright &copy; 2015 world_data <br>
                         Second course exercise PHP and XML of the lecture Web and Multimedia Engineering
                 </div>
                 <div class="footer_right_container">
                         The solution has been created by:<br>
                         Andr&eacute; K&uuml;hnert (s6510611) and Fabian Boltz (s3349388) - Team 45
                 </div>
         </footer>
</body>
</html>