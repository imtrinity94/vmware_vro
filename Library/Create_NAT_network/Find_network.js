/**
 * Find network
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {number} networkCidr
 * @param {string} attrNetworkView
 * @param {string} attrNetworkAddress
 * @return {Array/Any} attrFoundNetworks - [object Object]
 */
var filterLog = "Searching for networks by filter:";

var ipamNetworkFilter = new IpamNetworkFilter();

ipamNetworkFilter.ipVersion = IpamIpVersion.IP_V4;
filterLog += "\n\tIP version: IPv4";

if (attrNetworkView) {
	ipamNetworkFilter.networkView = attrNetworkView;
	filterLog += "\n\tNetwork view: " + ipamNetworkFilter.networkView;
}

if (attrNetworkAddress) {
	ipamNetworkFilter.network = attrNetworkAddress + "/" + networkCidr;
	filterLog += "\n\tNetwork address: " + ipamNetworkFilter.network;
}

System.log(filterLog);

var networkManager = ipamConnection.getNetworkManager();
var attrIpamNetworks = networkManager.findNetworks(ipamNetworkFilter);

if (attrIpamNetworks != null && attrIpamNetworks.length > 0) {
	var resultLog = "Found networks:";

	for (var i = 0; i < attrIpamNetworks.length; i++) {
		resultLog += "\n\t" + attrIpamNetworks[i].address + "/" + attrIpamNetworks[i].cidr + ", " + attrIpamNetworks[i].networkView;
	}
	
	attrFoundNetworks = attrIpamNetworks;
	
	System.log(resultLog);	
} else {
	System.log("Networks not found.");
}