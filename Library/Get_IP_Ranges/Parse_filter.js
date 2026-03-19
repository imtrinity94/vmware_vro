/**
 * Parse filter
 *
 * @param {string} attrFilter
 * @return {string} attrAddressSpace
 * @return {string} attrColumnName
 * @return {string} attrColumnSubstring
 */
System.log("Parsing the filter [" + attrFilter + "]...");

var splitFilters = attrFilter.split(/and/i);

var addrspacePattern = /\s*addressSpaceId\s*eq\s*'([^']+)'\s*/;
var substringPattern = /\s*substringof\('([^']+)',tolower\(([^\)]+)\)\)\s*/;

for each (var filter in splitFilters) {
	if (!filter) {
		continue;
	}
	
	if (addrspacePattern.test(filter)) {
		var resultArray = addrspacePattern.exec(filter);
		if (resultArray != null) {
			attrAddressSpace = resultArray[1];
			System.log("Got address space: " + attrAddressSpace);
		}
	} else if (substringPattern.test(filter)) {
		var resultArray = substringPattern.exec(filter);
		if (resultArray != null) {
			attrColumnSubstring = resultArray[1].toLowerCase();
			attrColumnName = resultArray[2].toLowerCase();
			System.log("Got column name: " + attrColumnName);
			System.log("Got column substring: \"" + attrColumnSubstring + "\"");
		}
	} else {
		System.warn("Unknown filter format [" + filter + "].");
	}
}
