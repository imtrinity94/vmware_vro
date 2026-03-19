/**
 * Scan
 *
 * @param {Array/VUM:VIInventory} entities
 * @param {Array/VUM:ScanType} scanType
 */
function getStringArrayFromEnumArray(enumArray) {
	if(null == enumArray) {
		return null;
	}
	var stringArray = new Array(enumArray.length);
	for(var i=0; i<enumArray.length; i++){
		stringArray[i] = enumArray[i].id;
	}
	return stringArray;
}

VumObjectManager.scanInventory(entities, getStringArrayFromEnumArray(scanType));