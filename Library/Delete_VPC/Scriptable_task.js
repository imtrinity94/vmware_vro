/**
 * Scriptable task
 *
 * @param {AWS:EC2Vpc} vpc - [object Object]
 */
//Get the AmazonEC2 client
var client = vpc.getClient().getAmazonEC2Client();

//Initiate the DeleteVpcRequest
var deleteRequest = new EC2DeleteVpcRequest() ;

//Set the VPC id
deleteRequest.setVpcId(vpc.getVpcId());

//Send the request
client.deleteVpc(deleteRequest);