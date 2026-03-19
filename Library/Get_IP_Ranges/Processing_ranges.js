/**
 * Processing ranges
 *
 * @param {Array/Any} attrIpamRanges - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @return {Array/Any} attrIpamRanges - [object Object]
 * @return {number} attrVacantResults - [object Object]
 */
if (attrIpamRanges != null && attrIpamRanges.length > 0) {
	var resultLog = "Found IPAM ranges:";
	
	for (var i = 0; i < attrIpamRanges.length; i++) {
		resultLog += "\n\t" + attrIpamRanges[i].startAddress + "-" + attrIpamRanges[i].endAddress + ", " + attrIpamRanges[i].networkView;
	}

	var numberOfObjects = attrIpamRanges.length;
	if (numberOfObjects == (attrVacantResults + 1)) {
		resultLog += "\n\tResult overflow detected in ranges";
		attrIpamRanges = attrIpamRanges.slice(0, attrVacantResults);
		attrVacantResults = -1;
	} else {
		attrVacantResults -= numberOfObjects;
	}

	System.log(resultLog);	
} else {
	System.log("IPAM ranges not found.");
}

