/**
 * Processing containers
 *
 * @param {Array/Any} attrIpamContainers - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @return {Array/Any} attrIpamContainers - [object Object]
 * @return {number} attrVacantResults - [object Object]
 */
if (attrIpamContainers != null && attrIpamContainers.length > 0) {
	var resultLog = "Found IPAM network containers:";
	
	for (var i = 0; i < attrIpamContainers.length; i++) {
		resultLog += "\n\t" + attrIpamContainers[i].address + "/" + attrIpamContainers[i].cidr + ", " + attrIpamContainers[i].networkView;
	}

	var numberOfObjects = attrIpamContainers.length;
	if (numberOfObjects == (attrVacantResults + 1)) {
		resultLog += "\n\tResult overflow detected in networks";
		attrIpamContainers = attrIpamContainers.slice(0, attrVacantResults);
		attrVacantResults = -1;
	} else {
		attrVacantResults -= numberOfObjects;
	}
			
	System.log(resultLog);
} else {
	System.log("IPAM network containers not found.");
}

