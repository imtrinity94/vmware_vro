/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} attrInputConnection
 */
System.log("The IPAM connection [" + attrInputConnection.hostName + "/" + attrInputConnection.apiType.name
		+ "] is not equal to the connection in the plugin cache.");

var text = "The IPAM connection to update:";
text += "\n\tid: " + attrInputConnection.id;
text += "\n\thostName: " + attrInputConnection.hostName;
text += "\n\tapiType: " + attrInputConnection.apiType.name;
text += "\n\tpriority: " + attrInputConnection.connectionPriority;
text += "\n\tdefaultNetworkView: " + attrInputConnection.configDefaultNetworkView;
text += "\n\tdefaultDnsView: " + attrInputConnection.configDefaultDnsView;

System.log(text);