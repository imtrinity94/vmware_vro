/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {AWS:EC2Address} address - [object Object]
 * @param {AWS:EC2NetworkInterface} networkInterface - [object Object]
 * @param {boolean} allowReassociation - [object Object]
 */
//Get the AmazonEC2Client
var client = address.getClient().getAmazonEC2Client();

//Init request
var associateRequest = new EC2AssociateAddressRequest();

//Set options
associateRequest.setAllocationId(address.getAllocationId());
associateRequest.setAllowReassociation(allowReassociation);
associateRequest.setInstanceId(instance.getInstanceId());
if (networkInterface != null) {
	associateRequest.setNetworkInterfaceId(networkInterface.getNetworkInterfaceId());
}

//Send request
client.associateAddress(associateRequest);