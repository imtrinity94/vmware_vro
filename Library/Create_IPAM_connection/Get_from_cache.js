/**
 * Get from cache
 *
 * @param {string} id - [object Object]
 * @param {InfobloxIPAM:IpamConnection} attrInputConnection
 * @return {InfobloxIPAM:IpamConnection} attrCachedConnection
 * @return {boolean} attrSaveConnection
 */
System.log("Searching for IPAM connection with id [" + id + "] ...");

var connectionManager = new IpamConnectionManager();
attrCachedConnection = connectionManager.getConnectionById(id);

if (attrCachedConnection != null) {
	var text = "Got IPAM connection from the plugin cache:";
	text += "\n\tid: " + attrCachedConnection.id;
	text += "\n\thostName: " + attrCachedConnection.hostName;
	text += "\n\tapiType: " + attrCachedConnection.apiType.name;
	text += "\n\tpriority: " + attrCachedConnection.connectionPriority;
	text += "\n\tdefaultNetworkView: " + attrCachedConnection.configDefaultNetworkView;
	text += "\n\tdefaultDnsView: " + attrCachedConnection.configDefaultDnsView;
	System.log(text);
} else {
	System.log("The IPAM connection with id [" + id + "] was not found in the plugin cache.");
	attrSaveConnection = true;
}
