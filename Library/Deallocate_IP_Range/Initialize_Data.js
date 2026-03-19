/**
 * Initialize Data
 *
 * @param {Properties} eaProperties
 * @param {string} inputs
 * @return {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @return {string} netaddr
 * @return {number} cidr
 * @return {string} networkView
 * @return {string} networkType
 * @return {string} id
 */
const data = JSON.parse(inputs)
const subnet = data.ipRangeDeallocation.ipRangeId;
cidr = subnet.split("/").pop();
netaddr = subnet.split("/")[2];
networkView = subnet.split("/")[1];
id = data.ipRangeDeallocation.id;
System.log(cidr)
System.log(netaddr)
System.log(networkView)
System.log(id);
var endpoint_data = data.endpoint
var ipRangeDeallocation = data.resourceInfo;

connectionID = endpoint_data.id
var connectionManager = new IpamConnectionManager();
attrIpamConnection = connectionManager.getConnectionById(connectionID);

if (attrIpamConnection) {
	System.log("Infoblox IPAM connection: " + attrIpamConnection.hostName);
} else {
	System.log("Infoblox IPAM connection is not specified");
}

/*attrIpamConnection = ipamConnection;
if (attrIpamConnection) {
	System.log("Infoblox IPAM connection: " + attrIpamConnection.hostName);
} else {
	System.log("Infoblox IPAM connection is not specified");
}

if (!removeByEa) {
	eaNumber = 0;
}

if (eaNumber >= 1) {
	attrSearchEa1Definition = searchEa1Definition;
	attrSearchEa1Value = searchEa1Value;
	attrSearchEa1Comparison = searchEa1Comparison;
}

if (eaNumber >= 2) {
	attrSearchEa2Definition = searchEa2Definition;
	attrSearchEa2Value = searchEa2Value;
	attrSearchEa2Comparison = searchEa2Comparison;
}

if (eaNumber >= 3) {
	attrSearchEa3Definition = searchEa3Definition;
	attrSearchEa3Value = searchEa3Value;
	attrSearchEa3Comparison = searchEa3Comparison;
}

if (eaNumber >= 4) {
	attrSearchEa4Definition = searchEa4Definition;
	attrSearchEa4Value = searchEa4Value;
	attrSearchEa4Comparison = searchEa4Comparison;
}

if (eaNumber >= 5) {
	attrSearchEa5Definition = searchEa5Definition;
	attrSearchEa5Value = searchEa5Value;
	attrSearchEa5Comparison = searchEa5Comparison;
}

if (eaNumber >= 6) {
	attrSearchEa6Definition = searchEa6Definition;
	attrSearchEa6Value = searchEa6Value;
	attrSearchEa6Comparison = searchEa6Comparison;
}

if (eaNumber >= 7) {
	attrSearchEa7Definition = searchEa7Definition;
	attrSearchEa7Value = searchEa7Value;
	attrSearchEa7Comparison = searchEa7Comparison;
}

if (eaNumber >= 8) {
	attrSearchEa8Definition = searchEa8Definition;
	attrSearchEa8Value = searchEa8Value;
	attrSearchEa8Comparison = searchEa8Comparison;
}

if (eaNumber >= 9) {
	attrSearchEa9Definition = searchEa9Definition;
	attrSearchEa9Value = searchEa9Value;
	attrSearchEa9Comparison = searchEa9Comparison;
}

if (eaNumber >= 10) {
	attrSearchEa10Definition = searchEa10Definition;
	attrSearchEa10Value = searchEa10Value;
	attrSearchEa10Comparison = searchEa10Comparison;
}*/