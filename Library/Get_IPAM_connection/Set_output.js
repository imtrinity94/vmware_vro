/**
 * Set output
 *
 * @param {InfobloxIPAM:IpamConnection} currentConnection
 * @return {InfobloxIPAM:IpamConnection} connectionOut
 */
if (!currentConnection) {
	throw "Error connecting to Infoblox IPAM service because could not get IPAM connection from the plugin cache."
}

connectionOut = currentConnection;
System.log("Got IPAM connection: " + connectionOut.hostName + "/" + connectionOut.apiType.name);
