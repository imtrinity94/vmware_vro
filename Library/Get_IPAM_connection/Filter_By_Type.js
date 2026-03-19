/**
 * Filter By Type
 *
 * @param {Array/InfobloxIPAM:IpamConnection} ipamConnections
 * @return {Array/InfobloxIPAM:IpamConnection} ipamConnections
 * @return {InfobloxIPAM:IpamApiType} apiType
 */
var filteredConnections = new Array();
filteredConnections.push(ipamConnections[0]);

apiType = ipamConnections[0].apiType;

for (var i = 1; i < ipamConnections.length; i++) {
	if (ipamConnections[i].apiType == apiType) {
		filteredConnections.push(ipamConnections[i]);
	}
}

ipamConnections = filteredConnections;