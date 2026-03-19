/**
 * Get network
 *
 * @param {Array/Any} attrFoundNetworks
 * @param {string} networkProfileId
 * @return {Any} attrNetwork
 */
if(attrFoundNetworks.length > 1) {
	throw "More than one on-demand networks for NAT Network Profile [" + networkProfileId + "] were found in IPAM."
}

attrNetwork = attrFoundNetworks[0];