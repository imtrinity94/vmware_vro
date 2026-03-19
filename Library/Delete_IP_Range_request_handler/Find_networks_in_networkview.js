/**
 * Find networks in networkview
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection - [object Object]
 * @param {string} attrNetworkView - [object Object]
 * @return {boolean} attrNetworkViewHasMoreNetworks - [object Object]
 */
var filterLog = "Searching for networks by filter:";

var ipamNetworkFilter = new IpamNetworkFilter();

ipamNetworkFilter.ipVersion = IpamIpVersion.IP_V4;
filterLog += "\n\tIP version: IPv4";

if (attrNetworkView) {
	ipamNetworkFilter.networkView = attrNetworkView;
	filterLog += "\n\tNetwork view: " + ipamNetworkFilter.networkView;
}

System.log(filterLog);

var networkManager = attrIpamConnection.getNetworkManager();
var networks = networkManager.findNetworks(ipamNetworkFilter);

if (networks != null && networks.length > 0) {
	attrNetworkViewHasMoreNetworks = true;
	var resultLog = "Found networks:";
	
	for (var i = 0; i < networks.length; i++) {
		resultLog += "\n\t" + networks[i].address + "/" + networks[i].cidr + ", " + networks[i].networkView;
	}

	System.log(resultLog);	
} else {
	System.log("Networks not found.");
}