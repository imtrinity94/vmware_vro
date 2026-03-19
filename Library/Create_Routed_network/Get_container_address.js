/**
 * Get container address
 *
 * @param {string} attrCurrentId
 * @return {string} attrNetworkView
 * @return {string} attrNetworkAddress
 * @return {number} attrNetworkCidr
 */
var componets = attrCurrentId.split("/");
attrNetworkView = componets[1];
attrNetworkAddress = componets[2];
attrNetworkCidr = parseInt(componets[3]);
if (isNaN(attrNetworkCidr)) {
	throw "Invalid network container CIDR: \"" + attrCurrentId + "\"."
}
