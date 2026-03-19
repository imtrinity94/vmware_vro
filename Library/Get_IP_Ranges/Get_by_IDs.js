/**
 * Get by IDs
 *
 * @param {Array/string} IdCollection
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @return {Array/Any} attrIpamNetworks
 * @return {Array/Any} attrIpamRanges
 * @return {Array/Any} attrIpamContainers
 */
System.log("Getting IPAM networks/ranges/network containers by IDs...");

var networkManager = attrIpamConnection.getNetworkManager();
attrIpamNetworks = new Array();
attrIpamRanges = new Array();
attrIpamContainers = new Array();

for each (var id in IdCollection) {
	if (isNetwork(id)) {
		var network = getNetworkById(id);
		System.log("Got IPAM network: " + network.address + "/" + network.cidr + ", " + network.networkView);
		attrIpamNetworks.push(network);
	} else if (isRange(id)) {
		var range = getRangeById(id);
		System.log("Got IPAM range: " + range.startAddress + "-" + range.endAddress + ", " + range.networkView);
		attrIpamRanges.push(range);
	} else if (isNetworkContainer(id)) {
		var container = getNetworkContainerById(id);
		System.log("Got IPAM network container: " + container.address + "/" + container.cidr + ", " + container.networkView);
		attrIpamContainers.push(container);
	} else {
		throw "Error getting IPAM network/range/network container by ID because ID \"" + id + "\" is invalid.";
	}
}

function getNetworkById(id) {
	var componets = id.split("/");
	var networkView = componets[1];
	var netaddr = componets[2];
	var cidr = parseInt(componets[3]);
	if (isNaN(cidr)) {
		throw "Error getting IPAM network by ID because ID \"" + id + "\" is invalid."
	}
	return networkManager.getNetwork(netaddr, cidr, networkView);
}

function getNetworkContainerById(id) {
	var componets = id.split("/");
	var networkView = componets[1];
	var netaddr = componets[2];
	var cidr = parseInt(componets[3]);
	if (isNaN(cidr)) {
		throw "Error getting IPAM network container by ID because ID \"" + id + "\" is invalid."
	}
	return networkManager.getNetworkContainer(netaddr, cidr, networkView);
}

function getRangeById(id) {
	var componets = id.split("/");
	var networkView = componets[1];
	var startAddress = componets[2];
	var endAddress = componets[3];
	return networkManager.getDhcpRange(startAddress, endAddress, networkView);
}

function isNetwork(id) {
	return id.indexOf("network/") != -1;
}

function isNetworkContainer(id) {
	return id.indexOf("container/") != -1;
}

function isRange(id) {
	return id.indexOf("range/") != -1;
}
