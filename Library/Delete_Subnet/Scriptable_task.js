/**
 * Scriptable task
 *
 * @param {AWS:EC2Subnet} subnet - [object Object]
 */
//Get the AmazonEC2Client
var client = subnet.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteSubnetRequest() ;

//Set options
deleteRequest.setSubnetId(subnet.getSubnetId());

//Send the request
client.deleteSubnet(deleteRequest);