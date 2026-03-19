/**
 * Convert CIDR
 *
 * @param {Any} attrIpamRange
 * @return {number} attrNetworkCidr
 */
attrNetworkCidr = parseInt(attrIpamRange.networkCidr);
if (isNaN(attrNetworkCidr)) {
	throw "Error allocating IP address(es) because parent network CIDR \"" + attrIpamRange.networkCidr + "\" is invalid."
}
