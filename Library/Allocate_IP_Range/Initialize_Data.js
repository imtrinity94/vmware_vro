/**
 * Initialize Data
 *
 * @param {string} inputs
 * @param {Properties} eaProperties
 * @return {InfobloxIPAM:IpamConnection} attrConnection
 * @return {string} netaddr
 * @return {number} cidr
 * @return {string} networkView
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea1DefinitionOut
 * @return {string} ea1ValueOut
 * @return {string} networkType
 * @return {boolean} cloudAPI
 * @return {string} tenantID
 * @return {Properties} attrEaProperties
 */
const data = JSON.parse(inputs)
cidr = data.cidr;
netaddr = data.netaddr
networkView = data.networkview
var endpoint_data = data.endpoint
var ipRangeAllocation = data.resourceInfo;
networkType = ipRangeAllocation.properties.networkType;
const allocationType = endpoint_data.endpointProperties.properties;
var allocVal = JSON.parse(allocationType);
const allocationValue =  allocVal[0].prop_value;
attrEaProperties = new Properties();
tenantID = ipRangeAllocation.id;
if (allocationValue == 'Cloud API') {
cloudAPI =  true;
attrEaProperties.put("Tenant ID", tenantID);
delete attrEaProperties['CMP Type']
delete attrEaProperties['Cloud API Owned']
} 

if (networkType == 'EXISTING')
{
    throw "New Network not needed in case of existing network type."
}

connectionID = endpoint_data.id
var connectionManager = new IpamConnectionManager();
attrConnection = connectionManager.getConnectionById(connectionID);

eaNumberOut = eaProperties.keys.length;
var currentEaName;

if (eaNumberOut > 0) {
	currentEaName = eaProperties.keys[0];
	ea1DefinitionOut = attrConnection.getExtensibleAttributeDefinition(currentEaName);
	ea1ValueOut = eaProperties.get(currentEaName);
}

if (attrConnection) {
	System.log("Infoblox IPAM connection: " + attrConnection.hostName);
} else {
	System.log("Infoblox IPAM connection is not specified");
}
