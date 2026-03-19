/**
 * Find ranges in network
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection - [object Object]
 * @param {string} attrNetworkAddress - [object Object]
 * @param {number} attrNetworkCidr - [object Object]
 * @param {string} attrNetworkView - [object Object]
 * @return {boolean} attrNetworkHasMoreRanges - [object Object]
 */
var filterLog = "Searching for ranges by filter:";

var ipamRangeFilter = new IpamRangeFilter();

ipamRangeFilter.ipVersion = IpamIpVersion.IP_V4;
filterLog += "\n\tIP version: IPv4";

if (attrNetworkView) {
	ipamRangeFilter.networkView = attrNetworkView;
	filterLog += "\n\tNetwork view: " + ipamRangeFilter.networkView;
}

if (attrNetworkAddress && attrNetworkCidr) {
	ipamRangeFilter.network = attrNetworkAddress + "/" + attrNetworkCidr;
	filterLog += "\n\tNetwork: " + ipamRangeFilter.network;
}

System.log(filterLog);

var networkManager = attrIpamConnection.getNetworkManager();
var ranges = networkManager.findRanges(ipamRangeFilter);

if (ranges != null && ranges.length > 0) {
	attrNetworkHasMoreRanges = true;
	var resultLog = "Found ranges:";
	
	for (var i = 0; i < ranges.length; i++) {
		resultLog += "\n\t" + ranges[i].startAddress + "-" + ranges[i].endAddress + ", " + ranges[i].networkView;
	}

	System.log(resultLog);	
} else {
	System.log("Ranges not found.");
}