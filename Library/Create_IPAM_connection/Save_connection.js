/**
 * Save connection
 *
 * @param {InfobloxIPAM:IpamConnection} attrTestConnection
 * @return {InfobloxIPAM:IpamConnection} attrTestConnection
 */
var connectionManager = new IpamConnectionManager();
attrTestConnection = connectionManager.saveConnection(attrTestConnection);
System.log("The IPAM connection [" + attrTestConnection.hostName + "/" + attrTestConnection.apiType.name + "] was saved in the plugin cache.");