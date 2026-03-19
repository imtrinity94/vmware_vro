/**
 * Get network address
 *
 * @param {string} attrExternalRangeId
 * @return {string} attrNetworkView
 * @return {string} attrNetworkAddress
 * @return {number} attrNetworkCidr
 */
var componets = attrExternalRangeId.split("/");
attrNetworkView = componets[1];
attrNetworkAddress = componets[2];
attrNetworkCidr = parseInt(componets[3]);

if (isNaN(attrNetworkCidr)) {
	throw "Network Cidr of IP range ID \"" + attrExternalRangeId + "\" is invalid."
}
