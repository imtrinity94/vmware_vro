/**
 * Convert to result
 *
 * @param {Array/string} attrDnsSearchSuffixes
 * @param {string} attrDnsSuffix
 * @param {string} attrGateway
 * @param {Array/string} attrIpAddresses
 * @param {string} attrIpRangeId
 * @param {number} attrNetworkCidr
 * @param {string} attrPrimaryDns
 * @param {string} attrPrimaryWins
 * @param {string} attrRequestId
 * @param {string} attrSecondaryDns
 * @param {string} attrSecondaryWins
 * @return {CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} attrCurrentResult
 */
var jointDnsSearchSuffixes = null;
if (attrDnsSearchSuffixes != null && attrDnsSearchSuffixes.length > 0) {
	jointDnsSearchSuffixes = attrDnsSearchSuffixes.join(",");
}

attrCurrentResult = {
	AllocationRequestId:attrRequestId,
	IPAddresses:attrIpAddresses,
	RangeId:attrIpRangeId,
	IPVersion:'IPv4',
	SubnetPrefixLength:attrNetworkCidr,
	Gateway:attrGateway,
	DNSSuffix:attrDnsSuffix,
	DNSSearchSuffixes:jointDnsSearchSuffixes,
	PrimaryDNS:attrPrimaryDns,
	SecondaryDNS:attrSecondaryDns,
	PrimaryWINS:attrPrimaryWins,
	SecondaryWINS:attrSecondaryWins
};
