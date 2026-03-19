/**
 * Processing networks
 *
 * @param {Array/Any} attrIpamNetworks - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @return {Array/Any} attrIpamNetworks - [object Object]
 * @return {number} attrVacantResults - [object Object]
 */
if (attrIpamNetworks != null && attrIpamNetworks.length > 0) {
	var resultLog = "Found IPAM networks:";

	for (var i = 0; i < attrIpamNetworks.length; i++) {
		resultLog += "\n\t" + attrIpamNetworks[i].address + "/" + attrIpamNetworks[i].cidr + ", " + attrIpamNetworks[i].networkView;
	}
	
	var numberOfObjects = attrIpamNetworks.length;
	if (numberOfObjects == (attrVacantResults + 1)) {
		resultLog += "\n\tResult overflow detected in networks";
		attrIpamNetworks = attrIpamNetworks.slice(0, attrVacantResults);
		attrVacantResults = -1;
	} else {
		attrVacantResults -= numberOfObjects;
	}
	
	System.log(resultLog);	
} else {
	System.log("IPAM networks not found.");
}
