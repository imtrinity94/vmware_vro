/**
 * Find ranges
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection - [object Object]
 * @param {string} attrAddressSpace - [object Object]
 * @param {Array/Any} attrSearchEas - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @param {string} attrNetworkRegExp - [object Object]
 * @return {Array/Any} attrIpamRanges
 */
var filterLog = "Searching for IPAM ranges by filter:";

var ipamRangeFilter = new IpamRangeFilter();

ipamRangeFilter.ipVersion = IpamIpVersion.IP_V4;
filterLog += "\n\tIP version: IPv4";

if (attrAddressSpace) {
	ipamRangeFilter.networkView = attrAddressSpace;
	filterLog += "\n\tNetwork view: " + ipamRangeFilter.networkView;
}

if (attrSearchEas != null && attrSearchEas != undefined && attrSearchEas.length > 0) {
	ipamRangeFilter.extensibleAttributes = attrSearchEas;
	filterLog += "\n\tExtensible attributes:";
	for each (var ea in ipamRangeFilter.extensibleAttributes) {
		filterLog += "\n\t\t" + ea.extensibleAttribute.name + " " + ea.comparison.id + " \"" + ea.extensibleAttribute.value + "\"";
	}
}

if (attrVacantResults >= 0) {
	ipamRangeFilter.maxResults = attrVacantResults + 1;
	filterLog += "\n\tMaximum results limit: " + ipamRangeFilter.maxResults;
}

if (attrNetworkRegExp) {
	ipamRangeFilter.network = attrNetworkRegExp;
	ipamRangeFilter.networkSearchComparison = IpamSearchComparisonType.REGULAR_EXPRESSION;
	filterLog += "\n\tNetwork filter expression: " + ipamRangeFilter.network;
}

System.log(filterLog);

var networkManager = attrIpamConnection.getNetworkManager();
attrIpamRanges = networkManager.findRanges(ipamRangeFilter);