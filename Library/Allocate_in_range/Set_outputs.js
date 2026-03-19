/**
 * Set outputs
 *
 * @param {string} attrGateway
 * @param {string} attrDnsSuffix
 * @param {Array/string} attrDnsSearchSuffixes
 * @param {string} attrPrimaryDns
 * @param {string} attrSecondaryDns
 * @param {string} attrPrimaryWins
 * @param {string} attrSecondaryWins
 * @param {Array/string} attrIpAddresses
 * @param {number} attrNetworkCidr
 * @param {boolean} attrOnDemandRange - [object Object]
 * @return {string} gatewayOut
 * @return {string} dnsSuffixOut
 * @return {Array/string} dnsSearchSuffixesOut
 * @return {string} primaryDnsOut
 * @return {string} secondaryDnsOut
 * @return {string} primaryWinsOut
 * @return {string} secondaryWinsOut
 * @return {Array/string} ipAddressesOut
 * @return {number} networkCidrOut
 * @return {boolean} onDemandRange - [object Object]
 */
gatewayOut = attrGateway;
dnsSuffixOut = attrDnsSuffix;
dnsSearchSuffixesOut = attrDnsSearchSuffixes;
primaryDnsOut = attrPrimaryDns;
secondaryDnsOut = attrSecondaryDns;
primaryWinsOut = attrPrimaryWins;
secondaryWinsOut = attrSecondaryWins;
ipAddressesOut = attrIpAddresses;
networkCidrOut = attrNetworkCidr;
onDemandRange = attrOnDemandRange;