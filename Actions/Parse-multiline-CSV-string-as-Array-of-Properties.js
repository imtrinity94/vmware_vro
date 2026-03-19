/**
 * @description Parses a multiline CSV string into an array of Properties objects.
 *              The first row is treated as the header (keys), and each subsequent row
 *              becomes a Properties entry. Quotes around values are stripped if present.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} csv - The multiline CSV string to parse.
 * @returns {Properties[]} An array where each item is a Properties object representing one CSV row.
 */

var lines = csv.split(/\r\n|\r|\n/);
if (lines.length < 2) {
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
    if (row.length != columnNames.length) {
        throw("Row " + i + " does not have the same number of fields as the header row of the csv");
    }

    var rowProps = new Properties();
    for (var c in columnNames) {
        rowProps.put(trimQuotes(columnNames[c]), trimQuotes(row[c]));
    }

    toReturn.push(rowProps);
}

return toReturn;

/**
 * Strips surrounding double-quotes from a string value if present.
 *
 * @param {string} x - The string to strip quotes from.
 * @returns {string} The string without surrounding quotes.
 */
function trimQuotes(x) {
    if (x.charAt(0) == '"' && x.charAt(x.length - 1) == '"') {
        return x.substr(1, x.length - 2);
    }
    return x;
}
