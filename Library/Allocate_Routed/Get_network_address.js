/**
 * Get network address
 *
 * @param {string} attrCurrentIpRange
 * @param {string} networkView
 * @return {string} attrNetworkAddress
 * @return {number} attrNetworkCidr
 * @return {string} attrNetworkView
 */
var componets = attrCurrentIpRange.split("/");
attrNetworkView = componets[1];
attrNetworkAddress = componets[2];
attrNetworkCidr = parseInt(componets[3]);

if (networkView && networkView != attrNetworkView) {
	throw "Error allocating IP address(es) because IP range ID \"" + attrCurrentIpRange + "\" doesn't belong to specified address space \"" + networkView + "\"."
}

if (isNaN(attrNetworkCidr)) {
	throw "Error allocating IP address(es) because IP range ID \"" + attrCurrentIpRange + "\" is invalid."
}
