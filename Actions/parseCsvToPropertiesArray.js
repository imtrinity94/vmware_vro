/**
 * @description Parses a multiline CSV string into an array of Properties objects.
 *              The first row is treated as the header (keys), and each subsequent row
 *              becomes a Properties entry. Quotes around values are stripped if present.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string} multilineCsvContent - The multiline CSV string to parse.
 * @returns {Properties[]} parsedRowsList - An array where each item is a Properties object representing one CSV row.
 */

var csvLinesList = multilineCsvContent.split(/\r\n|\r|\n/);
if (csvLinesList.length < 2) {
    System.error("The provided CSV content must contain at least a header row and one data row.");
    throw "Invalid CSV content: Insufficient rows.";
}

var csvHeaderColumns = [];
var parsedRowsList = [];

var i;
for (i = 0; i < csvLinesList.length; i++) {
    var rawLineStr = csvLinesList[i];
    if (!rawLineStr || rawLineStr.trim().length === 0) {
        continue;
    }
    
    if (i === 0) {
        // Parse CSV Header row
        csvHeaderColumns = rawLineStr.split(",");
        continue;
    }

    var rowFieldsArray = rawLineStr.split(",");
    if (rowFieldsArray.length !== csvHeaderColumns.length) {
        System.warn("Row consistency error at line " + (i + 1) + ". Field count mismatch.");
        throw "CSV structure mismatch: Row " + (i + 1) + " field count does not match header.";
    }

    var rowPropertiesObj = new Properties();
    var j;
    for (j = 0; j < csvHeaderColumns.length; j++) {
        var keyLabel = stripEncapsulatedQuotes(csvHeaderColumns[j]);
        var valueData = stripEncapsulatedQuotes(rowFieldsArray[j]);
        rowPropertiesObj.put(keyLabel, valueData);
    }

    parsedRowsList.push(rowPropertiesObj);
}

System.log("Successfully parsed " + parsedRowsList.length + " rows from CSV.");

return parsedRowsList;

/**
 * Strips surrounding double-quotes from a string value if present.
 */
function stripEncapsulatedQuotes(inputStr) {
    if (inputStr === null || inputStr === undefined) {
        return "";
    }
    var trimmed = inputStr.trim();
    if (trimmed.charAt(0) === '"' && trimmed.charAt(trimmed.length - 1) === '"') {
        return trimmed.substring(1, trimmed.length - 1);
    }
    return trimmed;
}
