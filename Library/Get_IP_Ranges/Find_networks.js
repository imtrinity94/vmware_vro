/**
 * Find networks
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection - [object Object]
 * @param {string} attrAddressSpace - [object Object]
 * @param {Array/Any} attrSearchEas - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @param {string} attrNetworkRegExp - [object Object]
 * @return {Array/Any} attrIpamNetworks
 */
var filterLog = "Searching for IPAM networks by filter:";

var ipamNetworkFilter = new IpamNetworkFilter();

ipamNetworkFilter.ipVersion = IpamIpVersion.IP_V4;
filterLog += "\n\tIP version: IPv4";

if (attrAddressSpace) {
	ipamNetworkFilter.networkView = attrAddressSpace;
	filterLog += "\n\tNetwork view: " + ipamNetworkFilter.networkView;
}

if (attrSearchEas != null && attrSearchEas != undefined && attrSearchEas.length > 0) {
	ipamNetworkFilter.extensibleAttributes = attrSearchEas;
	filterLog += "\n\tExtensible attributes:";
	for each (var ea in ipamNetworkFilter.extensibleAttributes) {
		filterLog += "\n\t\t" + ea.extensibleAttribute.name + " " + ea.comparison.id + " \"" + ea.extensibleAttribute.value + "\"";
	}
}

if (attrVacantResults >= 0) {
	ipamNetworkFilter.maxResults = attrVacantResults + 1;
	filterLog += "\n\tMaximum results limit: " + ipamNetworkFilter.maxResults;
}

if (attrNetworkRegExp) {
	ipamNetworkFilter.network = attrNetworkRegExp;
	ipamNetworkFilter.networkSearchComparison = IpamSearchComparisonType.REGULAR_EXPRESSION;
	filterLog += "\n\tNetwork filter expression: " + ipamNetworkFilter.network;
}

System.log(filterLog);

var networkManager = attrIpamConnection.getNetworkManager();
attrIpamNetworks = networkManager.findNetworks(ipamNetworkFilter);
