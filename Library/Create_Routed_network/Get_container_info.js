/**
 * Get container info
 *
 * @param {Any} attrContainer
 * @return {string} attrContainerRef
 * @return {string} attrDomainName
 * @return {Array/string} attrDomainSearch
 * @return {Array/string} attrDomainNameServers
 * @return {Array/string} attrRouters
 * @return {Array/string} attrNetbiosNameServers
 */
attrContainerRef = attrContainer.reference;

if (!attrContainerRef) {
	throw "Invalid reference to parent network container: " + attrContainerRef;
}

var dhcpOptions = attrContainer.dhcpOptions;

if (dhcpOptions) {
	if (dhcpOptions.domainName) {
		attrDomainName = dhcpOptions.domainName;
	}
	
	if (dhcpOptions.domainSearch != null && dhcpOptions.domainSearch != undefined && dhcpOptions.domainSearch.length > 0) {
		attrDomainSearch = dhcpOptions.domainSearch;
	}
	
	// To avoid the issue when workflow fails because the gateway doesn't belong to the created next available network
	/*if (dhcpOptions.routers != null && dhcpOptions.routers != undefined && dhcpOptions.routers.length > 0) {
		attrRouters = dhcpOptions.routers;
	}*/
	attrRouters = null;
	
	if (dhcpOptions.domainNameServers != null && dhcpOptions.domainNameServers != undefined && dhcpOptions.domainNameServers.length > 0) {
		attrDomainNameServers = dhcpOptions.domainNameServers;
	}
	
	if (dhcpOptions.netbiosNameServers != null && dhcpOptions.netbiosNameServers != undefined && dhcpOptions.netbiosNameServers.length > 0) {
		attrNetbiosNameServers = dhcpOptions.netbiosNameServers;
	}
}
