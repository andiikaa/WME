<?php
	include("conf.php");

/*
Class for parsing a csv file
*/
class WorldDataParser{
	
	/*
	Returns a array of the parsed csv. No error handling if the file not exists, 
	found or can not be read.
	
	@parameter path 
		specifies the path, from which the csv file is read

	@returns parsed data as array
	*/
	function parseCSV($path){
		$out = Array();
		$rowcount = 0;
		$handle = fopen($path, "r"); 
		$header = fgetcsv($handle);
		$header_colcount = count($header);
		
		while (($row = fgetcsv($handle)) !== FALSE) {
			$row_colcount = count($row);
			$entry = array_combine($header, $row);
			$out[] = $entry;
			$rowcount++;
		}
			
		fclose($handle);	
		return $out;
	} 
	
	
	/*
	Saves a given Array as a XML File with the name 'world_data.xml'
	Existing files will be overridden.
	
	@param data
		array data which should be written as xml
		
	@returns status message as string
	*/
	function saveXML($data){
		$raw_xml = $this->createRawXML($data);
		$xml = $this->formatXML($raw_xml->asXML());		
		return file_put_contents(XML_PATH, $xml) == FALSE ? FALSE : TRUE;
	}
	
	/*
	transformes xml data with the help of a given stylesheet
	*/
	function printXML($xml_path, $xsl_path){
		$xml_dom = new DOMDocument();
		$xml_dom->load($xml_path);

		
		$xsl_dom = new DOMDocument();
		$xsl_dom->load($xsl_path);
		
		$proc = new XSLTProcessor();
		$proc->importStylesheet($xsl_dom);
		
		$doc = $proc->transformToDOC($xml_dom);
		$doc->formatOutput = true;
		return $doc->saveHTML();
	}
	
	/*
	
	@param data
		data which should be transformed to xml as an array 
		
	@returns gets a SimpleXMLElement
	*/
	function createRawXML($data){
		$root = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?><Countries></Countries>');
		
		foreach($data as $row){
			$tmp_country = $root->addChild("Country");
		
			foreach($row as $key => $value){
				$keyname = $this->getKeyName($key);
				$tmp_value = $this->trimAll($value);
				$tmp_country->addChild($keyname , $tmp_value);
			}		
		}		
		return $root;	
	}
	
	/*
	Formats the given xml data.
	
	@param data 
		the raw xml data as string
		
	@returns formated xml data as string
	*/
	function formatXML($data){
		$dom = new DOMDocument('1.0');
		$dom->preserveWhiteSpace = false;
		$dom->formatOutput = true;
		$dom->loadXML($data);
		return $dom->saveXML();
	}
	
	/*
	Gets a key name for the xml tag (e.g. removes whitespace).
	
	@param name 
		name to convert
	@returns string value
	*/
	function getKeyName($name){
		$tmp = $this->trimAll($name);
		
		//strtok should return a array but accessing the 
		//first value with $split[0] will return the first letter?
		$split = strtok($tmp, " ");
		return $split;
	}
	
	/*
	trimming whitespace from the value
	*/
	function trimAll($value){
		$tmp = ltrim($value, " ");
		$tmp = rtrim($tmp, " ");
		return $tmp;			
	}
}
?>