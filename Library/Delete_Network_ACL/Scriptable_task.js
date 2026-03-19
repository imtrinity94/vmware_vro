/**
 * Scriptable task
 *
 * @param {AWS:EC2NetworkAcl} networkAcl - [object Object]
 */
//Get the AmazonEC2Client
var client = networkAcl.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteNetworkAclRequest();

//Set the network ACL id
deleteRequest.setNetworkAclId(networkAcl.getNetworkAclId());

//Send the request
client.deleteNetworkAcl(deleteRequest);