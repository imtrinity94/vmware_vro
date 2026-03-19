/**
 * Initialize Data
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @return {InfobloxIPAM:IpamConnection} attrConnection
 */
attrConnection = ipamConnection;
if (attrConnection) {
	System.log("Infoblox IPAM connection: " + attrConnection.hostName);
} else {
	System.log("Infoblox IPAM connection is not specified");
}
