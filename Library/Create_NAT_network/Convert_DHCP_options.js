/**
 * Convert DHCP options
 *
 * @param {string} gateway
 * @param {string} primaryDns
 * @param {string} secondaryDns
 * @param {string} primaryWins
 * @param {string} secondaryWins
 * @param {string} dnsSuffix
 * @param {Array/string} dnsSearchSuffixes
 * @return {string} attrDomainName
 * @return {Array/string} attrDomainSearch
 * @return {Array/string} attrDomainNameServers
 * @return {Array/string} attrRouters
 * @return {Array/string} attrNetbiosNameServers
 */
if (gateway) {
	attrRouters = [gateway];
}

if (dnsSuffix) {
	attrDomainName = dnsSuffix;
}

if (dnsSearchSuffixes != null && dnsSearchSuffixes != undefined && dnsSearchSuffixes.length > 0) {
	attrDomainSearch = dnsSearchSuffixes;
}

if (primaryDns) {
	attrDomainNameServers = [primaryDns];
	if (secondaryDns) {
		attrDomainNameServers.push(secondaryDns);
	}
}

if (primaryWins) {
	attrNetbiosNameServers = [primaryWins];
	if (secondaryWins) {
		attrNetbiosNameServers.push(secondaryWins);
	}
}
