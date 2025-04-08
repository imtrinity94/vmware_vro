/**
 * Converts a CSV file retrieved from a URL into a JSON object.
 * 
 * @author Mayank Goyal
 * @version 1.0.0
 * 
 * @param {string} url - The URL of the CSV file to be converted.
 * @returns {void} Logs the JSON representation of the CSV file.
 */
var urlObject = new URL(url);

// Retrieve the content of the CSV file
var csvFile = urlObject.getContent();

// Check if the URL returned any data
if (!csvFile || csvFile.trim() === "") {
    System.error("The URL did not return any data. Please check the URL and try again.");
    return;
}

// Log the raw CSV content
System.log(csvFile);

// Split the CSV content into lines, removing carriage returns for Windows compatibility
var lines = csvFile.replace("\r", "").split("\n");

// Extract the header line and split it into individual fields
var headerLine = lines[0];
var headerFields = headerLine.split(",");

// Initialize an array to hold the resulting JSON objects
var objects = new Array();

// Iterate over each line in the CSV file
for (var l in lines) {
    if (l > 0) {
        var line = lines[l];

        // Skip empty lines
        if (!line.trim()) {
            continue;
        }

        // Split the current line into columns
        var columns = line.split(",");

        // Create a new object for the current line
        objects[l - 1] = {};

        // Map each column to its corresponding header field
        for (var h in headerFields) {
            var curHeader = headerFields[h];
            objects[l - 1][curHeader] = columns[h];
        }
    }
}

// Log the resulting JSON array
System.log(JSON.stringify(objects));

// Sample output from a GET to http://[webserver]/csvfile.csv:
// [2017-11-15 17:55:04.523] [I] firstname,lastname,middleinitial,age
// John,Doe,B,30
// Jane,Doe,H,32
// Jimmy,Dean,L,29
// [2017-11-15 17:55:04.530] [I] [{"firstname":"John","lastname":"Doe","middleinitial":"B","age":"30"},{"firstname":"Jane","lastname":"Doe","middleinitial":"H","age":"32"},{"firstname":"Jimmy","lastname":"Dean","middleinitial":"L","age":"29"}]