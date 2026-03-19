/**
 * Parse additional filter
 *
 * @param {string} AdditionalFilter
 * @param {Array/CompositeType(name:string,value:string,operator:string):EaFilter} attrEaFilters - [object Object]
 * @param {number} attrMaxResults - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @param {string} attrNetworkRegExp - [object Object]
 * @param {string} attrObjectType - [object Object]
 * @return {Array/CompositeType(name:string,value:string,operator:string):EaFilter} attrEaFilters
 * @return {number} attrMaxResults - [object Object]
 * @return {number} attrVacantResults - [object Object]
 * @return {string} attrNetworkRegExp - [object Object]
 * @return {string} attrObjectType - [object Object]
 */
System.log("Parsing additional filter [" + AdditionalFilter + "]...");

var splitFilters = AdditionalFilter.split(/and/i);
var isMaxResultsSet = false;
var isNetworkRegExpSet = false;
var isObjectTypeSet = false;

for each (var filter in splitFilters) {
	if (!filter) {
		continue;
	}
	
	var components = filter.split(/([!:<>~]?=)/);
	var objectValue = getValue(components[2]);
	var operatorId = getOperator(components[1]);
	if (isEAName(components[0])) {
		var eaName = getEAName(components[0]);
		pushToEaFilters(eaName, operatorId, objectValue); 
	} else {
		var objectName = getValue(components[0]);
		if (objectName == 'max') {
			if (!isMaxResultsSet) {
				if (!isValidMax(objectValue)) {
				    throw 'Invalid "max" option value: ' + objectValue;
				}
				attrMaxResults = attrVacantResults = parseInt(objectValue);
				isMaxResultsSet = true;
			} else {
				throw 'Invalid filter: duplicated "max" option';
			}
		} else if (objectName == 'network') {
			if (!isNetworkRegExpSet) {
				if (operatorId == '~=') {
					if (!isValidNetworkRegExp(objectValue)) {
						throw 'Invalid "network" option value: ' + objectValue;
					}					
					attrNetworkRegExp = objectValue;
					isNetworkRegExpSet = true;
				} else if (operatorId == '=') {
					if (!isValidNetworkSimpleExp(objectValue)) {
						throw 'Invalid "network" option value: ' + objectValue;
					}
					attrNetworkRegExp = convertToRegExp(objectValue);
					isNetworkRegExpSet = true;
				} else {
					throw 'Invalid operator for "network" option: ' + objectValue;
				}
			} else {
				throw 'Invalid filter: duplicated "network" option';
			}
		} else if (objectName == 'type') {
			if (!isObjectTypeSet) {
				if (!isValidType(objectValue)) {
					throw 'Invalid "type" option value: ' + objectValue;
				}
				attrObjectType = objectValue;
				isObjectTypeSet = true;
			} else {
				throw 'Invalid filter: duplicated "type" option';
			}
		} else {
			pushToEaFilters(objectName, operatorId, objectValue);
		}		
	}
}

if (attrEaFilters.length > 0) {
	var text = "Got extensible attributes: ";
	
	for each (var eaFilter in attrEaFilters) {
		text += "\n\t" + eaFilter.name + " " + eaFilter.operator + " " + eaFilter.value;
	}
	
	System.log(text);
} else {
	System.log("Extensible attributes were not found.")
}

if (isMaxResultsSet || isNetworkRegExpSet || isObjectTypeSet) {
	var text = "Got filter options: ";
	if (isMaxResultsSet) {
		text += "\n\t" + "maxResults = " + attrMaxResults;
	}
	if (isNetworkRegExpSet) {
		text += "\n\t" + "network = " + attrNetworkRegExp;
	}
	if (isObjectTypeSet) {
		text += "\n\t" + "type = " + attrObjectType;
	}
	System.log(text);
}

function getValue(str, complexValueRegexp, simpleValueRegexp) {
	var defaultComplexValueRegexp = /^\s*"([^"]+)"\s*$/;
	var defaultSimpleValueRegexp = /^\s*([^"\s]+)\s*$/;
	
	complexValueRegexp = (typeof complexValueRegexp !== 'undefined') ? complexValueRegexp : defaultComplexValueRegexp;
	simpleValueRegexp = (typeof simpleValueRegexp !== 'undefined') ? simpleValueRegexp : defaultSimpleValueRegexp;

	var resultArray = complexValueRegexp.exec(str);
	
	if (resultArray != null) {
		return resultArray[1];
	}
	
	resultArray = simpleValueRegexp.exec(str);
	
	if (resultArray != null) {
		return resultArray[1];
	}
	
	throw 'Invalid filter value: ' + str;
}

function getEAName(str) {
	var eaComplexValueRegexp = /^\s*ea:"([^"]+)"\s*$/;
	var eaSimpleValueRegexp = /^\s*ea:([^"\s]+)\s*$/;
	return getValue(str, eaComplexValueRegexp, eaSimpleValueRegexp);
}

function getOperator(str) {
	var operatorRegexp = /^\s*([!:<>~]?=)\s*$/;
	resultArray = operatorRegexp.exec(str);
	
	if (resultArray != null) {
		return resultArray[1];
	}
		
	throw 'Invalid filter operator: ' + str;
}

function isEAName(str) {
	var pattern = /^\s*ea:[\"\w]+.*/;
	return pattern.test(str);
}

// allowed
// digits, (, ), |, ., *, +, ?, ^, $, [, ], -, {, }, [,], \ 
function isValidNetworkRegExp(str){
	var pattern = /^[\d\(\)\|\.\*\+\?\^\$\[\]\-\{\}\,\\]+$/;
	return pattern.test(str);
}

// allowed
// digits, ., *,  
function isValidNetworkSimpleExp(str){
	var pattern = /^[\d\.\*]+$/;
	return pattern.test(str);
}

function convertToRegExp(str){
	var needStartOfStringSymbol = true;
	var needEndOfStringSymbol = true;

	if (str.charAt(0) == '*') {
		needStartOfStringSymbol = false;
	} 
	if (str.charAt(str.length-1) == '*') {
		needEndOfStringSymbol = false;
	} 
	
	str = str.replace(/\./g, '\\.');
	str = str.replace(/\*/g, '.*');
	
	if (needStartOfStringSymbol) {
		str = '^' + str;
	}

	if (needEndOfStringSymbol) {
		str = str + '$';
	}
	
	return str;
}

function isValidType(str){
	if (str == "network" || str == "range") {
		return true;
	}
	return false;
}

function isValidMax(str){
	var maxStr = parseInt(str);
	if (!isNaN(maxStr) && (maxStr > 0)) {
		return true;
	}
	return false;
}

function pushToEaFilters(eaName, operatorId, eaValue) {
	attrEaFilters.push({
		name:eaName,
		value:eaValue,
		operator:operatorId,
	});
}
