/**
 * Validate
 *
 * @param {Array/string} networkContainerIds
 * @param {number} networkCidr
 * @param {string} ipVersion
 */
if (!ipVersion) {
	throw "IP version is not specified.";
} else if(ipVersion != "IPv4")  {
	throw "Unsupported IP version: " + ipVersion;
}

if (networkContainerIds == null || networkContainerIds == undefined || networkContainerIds.length == 0) {
	throw "List of IP block IDs is not initialized or empty";
}

if (isNaN(networkCidr) || networkCidr > 128) {
	throw "Invalid network CIDR index.";
}
