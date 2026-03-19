/**
 * Scriptable task
 *
 * @param {AWS:EC2Vpc} vpc - [object Object]
 * @return {AWS:EC2NetworkAcl} networkAcl - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:AWSClient} client
 */
//Get the AmazonEC2Client
System.log("1");
var ec2Client = vpc.getClient().getAmazonEC2Client();

System.log("2");
//Init request
var createRequest = new EC2CreateNetworkAclRequest();

System.log("3");
//Set VPC id
createRequest.setVpcId(vpc.getVpcId());

System.log("4");
//Send request
var response = ec2Client.createNetworkAcl(createRequest);

System.log("5");
networkAcl = response.getNetworkAcl();
resourceId = networkAcl.getNetworkAclId();
client = vpc.getClient();