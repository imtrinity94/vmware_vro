/**
 * @description Converts a CSV file retrieved from a URL into a JSON array of objects.
 *              The first row is expected to be the header.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} url - The URL of the CSV file to be converted.
 * @returns {Array} jsonObjectsArray - The JSON array representation of the CSV.
 */

var csvUrl = new URL(url);
var csvRawContent = csvUrl.getContent();

if (!csvRawContent || csvRawContent.trim() === "") {
    System.error("The URL did not return any data. Please check the URL and try again.");
    return null;
}

System.log("CSV Content retrieved.");

// Normalize line endings and split
var csvLines = csvRawContent.replace(/\r/g, "").split("\n");
var headerLine = csvLines[0];
var headerFieldsList = headerLine.split(",");

var jsonObjectsArray = [];

var lineIdx;
for (lineIdx = 1; lineIdx < csvLines.length; lineIdx++) {
    var currentLine = csvLines[lineIdx];

    if (!currentLine.trim()) {
        continue;
    }

    var columnsList = currentLine.split(",");
    var rowObject = {};

    var headerIdx;
    for (headerIdx = 0; headerIdx < headerFieldsList.length; headerIdx++) {
        var key = headerFieldsList[headerIdx];
        var val = columnsList[headerIdx];
        rowObject[key] = val;
    }
    jsonObjectsArray.push(rowObject);
}

System.log("Resulting JSON: " + JSON.stringify(jsonObjectsArray));

return jsonObjectsArray;