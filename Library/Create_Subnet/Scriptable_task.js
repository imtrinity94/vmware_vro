/**
 * Scriptable task
 *
 * @param {AWS:EC2Vpc} vpc - [object Object]
 * @param {string} cidrBlock - [object Object]
 * @param {AWS:EC2AvailabilityZone} availabilityZone - [object Object]
 * @return {AWS:AWSClient} client
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2Subnet} subnet - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = vpc.getClient().getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateSubnetRequest();

//Set options
createRequest.setCidrBlock(cidrBlock);
createRequest.setVpcId(vpc.getVpcId());
if (availabilityZone != null) {
	createRequest.setAvailabilityZone(availabilityZone.getZoneName());
}

//Send the request
var result = ec2Client.createSubnet(createRequest);

subnet = result.getSubnet();
resourceId = subnet.getSubnetId();
client = vpc.getClient();