/**
 * Get range address
 *
 * @param {string} attrCurrentIpRange
 * @param {string} networkView
 * @return {string} attrStartAddress
 * @return {string} attrEndAddress
 * @return {string} attrNetworkView
 */
var componets = attrCurrentIpRange.split("/");
attrNetworkView = componets[1];
attrStartAddress = componets[2];
attrEndAddress = componets[3];

if (networkView && networkView != attrNetworkView) {
	throw "Error allocating IP address(es) because IP range ID \"" + attrCurrentIpRange + "\" doesn't belong to specified address space \"" + networkView + "\"."
}
