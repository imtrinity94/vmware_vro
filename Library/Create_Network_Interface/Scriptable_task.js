/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client
 * @param {string} description - [object Object]
 * @param {AWS:EC2Subnet} subnet - [object Object]
 * @param {string} secondaryPrivateAddresses - [object Object]
 * @param {string} primaryPrivateIpAddress - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2NetworkInterface} networkInterface - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateNetworkInterfaceRequest();

createRequest.setDescription(description);

var ipAddressSpecs = new Array();

//Create primary IP address spec
if (primaryPrivateIpAddress != '') {
	var primaryIpAddressSpec = new EC2PrivateIpAddressSpecification();
	primaryIpAddressSpec.setPrimary(true);
	primaryIpAddressSpec.setPrivateIpAddress(primaryPrivateIpAddress);
	ipAddressSpecs.push(primaryIpAddressSpec);
}

//Create secondary IP address specs
for (var address in secondaryPrivateAddresses) {
	var ipAddressSpec = new EC2PrivateIpAddressSpecification();
	ipAddressSpec.setPrimary(false);
	ipAddressSpec.setPrivateIpAddress(address);
	
	ipAddressSpecs.push(ipAddressSpec);
}

//Set the addresses in the request
if (ipAddressSpecs.length > 0) {
	createRequest.setPrivateIpAddresses(ipAddressSpecs);
}

//Set the subnet
if (subnet != null) {
	createRequest.setSubnetId(subnet.getSubnetId());
}

//Send the request
var result = ec2Client.createNetworkInterface(createRequest);

networkInterface = result.getNetworkInterface();

resourceId = result.getNetworkInterface().getNetworkInterfaceId();