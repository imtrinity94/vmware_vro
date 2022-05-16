/******************************************************
* Parses a CSV string as an array of Properties.
* The first row of the CSV file is assumed to be
* the header row. This row will act as the keys
* for each rows "Properties" object.
*
* Written for VMware vRealize Orchestrator (vRO)
******************************************************/

//Action Inputs:
//  csv  -  string
//
//Return type: Array/Properties


var lines = csv.split(/\r\n|\r|\n/);
if (lines.length<2) {
	System.error("Invalid CSV file! Expecting a header row");
	throw "Invalid CSV file! Expecting a header row";
}
var columnNames = [];
var toReturn = [];

for (var i in lines) {
	if (!lines[i]) {
		continue;
	}
	if (i === 0) {
		// header
		columnNames = lines[0].split(",");
		continue;
	}
	
	var row = lines[i].split(",");
	if (row.length != columnNames.length){
		throw("Row "+i+" does not have the same number of fields as the header row of the csv");
	}
	
	var rowProps = new Properties();
	for (var c in columnNames) {
		rowProps.put(trimQuotes(columnNames[c]),trimQuotes(row[c]));
	}
	
	toReturn.push(rowProps);
}

return toReturn;

function trimQuotes(x) {
	if (x.charAt(0) == '"' && x.charAt(x.length -1) == '"') {
		return x.substr(1,x.length -2)
	}
	return x;	
}
