/**
 * Scriptable task
 *
 * @param {AWS:EC2NetworkInterface} networkInterface - [object Object]
 */
//Get the AmazonEC2Client
var client = networkInterface.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteNetworkInterfaceRequest();

//Set the network interface id
deleteRequest.setNetworkInterfaceId(networkInterface.getNetworkInterfaceId());

//Send the request
client.deleteNetworkInterface(deleteRequest);