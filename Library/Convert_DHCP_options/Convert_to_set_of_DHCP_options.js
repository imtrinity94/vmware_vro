/**
 * Convert to set of DHCP options
 *
 * @param {Any} dhcpOptions
 * @return {string} gateway
 * @return {string} dnsSuffix
 * @return {Array/string} dnsSearchSuffixes
 * @return {string} primaryDns
 * @return {string} secondaryDns
 * @return {string} primaryWins
 * @return {string} secondaryWins
 */
if(dhcpOptions) {
	if (dhcpOptions.routers && (dhcpOptions.routers.length > 0)) {
		gateway = dhcpOptions.routers[0];
	}
	
	dnsSuffix = dhcpOptions.domainName;
	
	if (dhcpOptions.domainSearch && (dhcpOptions.domainSearch.length > 0)) {
		dnsSearchSuffixes = dhcpOptions.domainSearch;
	}

	if (dhcpOptions.domainNameServers && (dhcpOptions.domainNameServers.length > 0)) {
		primaryDns = dhcpOptions.domainNameServers[0];
		if (dhcpOptions.domainNameServers.length > 1) {
			secondaryDns = dhcpOptions.domainNameServers[1];
		}
	}
	
	if (dhcpOptions.netbiosNameServers && (dhcpOptions.netbiosNameServers.length > 0)) {
		primaryWins = dhcpOptions.netbiosNameServers[0];
		if (dhcpOptions.netbiosNameServers.length > 1) {
			secondaryWins = dhcpOptions.netbiosNameServers[1];
		}
	}
}
