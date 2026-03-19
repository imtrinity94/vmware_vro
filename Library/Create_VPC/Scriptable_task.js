/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client
 * @param {string} cidrBlock - [object Object]
 * @param {AWS:EC2Tenancy} tenancy - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2Vpc} vpc - [object Object]
 */
//Get the AmazonEC2 client 
var ec2Client = client.getAmazonEC2Client();

//Initiate the CreateVpcRequest
var vpcRequest = new EC2CreateVpcRequest();

//Set cidr block and tenancy
vpcRequest.setCidrBlock(cidrBlock);
if (tenancy != null) {
	vpcRequest.setInstanceTenancy(tenancy);
}

//Send the request
var vpcResult = ec2Client.createVpc(vpcRequest);

vpc = vpcResult.getVpc();
resourceId = vpc.getVpcId();

