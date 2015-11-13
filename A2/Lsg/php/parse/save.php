<!DOCTYPE html>
<?php
        include("world_data_parser.php");
?>

<html>
<head>
         <meta charset="UTF-8">
         <meta name="description" content="WME Aufgabe 2">
         <meta name="keywords" content="PHP">
         <meta name="author" content="Andre Kuehnert">
         <meta name="author" content="Fabian Boltz">

         <title>Aufgabe 2 - Save</title>
</head>
<body>


<?php
        $parser = new WorldDataParser();
        $parsed = $parser->parseCSV(WORLD_DATA_PATH);
        $save_result = $parser->saveXML($parsed);

        if($save_result)
                echo "<p style=\"color: green\">Writing XML file was succesful</p>";
        else
                echo "<p style=\"color: red\">Error while writing XML file</p>";
?>


</body>
</html>