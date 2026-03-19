/**
 * Get network address
 *
 * @param {string} attrIpRangeId - [object Object]
 * @return {string} attrNetworkAddress - [object Object]
 * @return {number} attrNetworkCidr - [object Object]
 * @return {string} attrNetworkView - [object Object]
 */
var componets = attrIpRangeId.split("/");
attrNetworkView = componets[1];
attrNetworkAddress = componets[2];
attrNetworkCidr = componets[3];
if (isNaN(attrNetworkCidr)) {
	throw "Error deleting IP Range because IP range ID \"" + attrIpRangeId + "\" is invalid."
}