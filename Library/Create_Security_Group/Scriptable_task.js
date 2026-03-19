/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client
 * @param {string} name - [object Object]
 * @param {string} description - [object Object]
 * @param {AWS:EC2Vpc} vpc - [object Object]
 * @return {AWS:EC2SecurityGroup} securityGroup - [object Object]
 */
//Get the AmazonEC2 client
var ec2Client = client.getAmazonEC2Client();

var createRequest = new EC2CreateSecurityGroupRequest();

//Set the options
createRequest.setGroupName(name);
if (vpc != null) {
	createRequest.setVpcId(vpc.getVpcId());
}
createRequest.setDescription(description);

//Send the request
var securityGroupResult = ec2Client.createSecurityGroup(createRequest);

var groupId = securityGroupResult.getGroupId();

//Create request to get the security group
var describeRequest = new EC2DescribeSecurityGroupsRequest();

//Push group id in an array
var groupIds = new Array();
groupIds.push(groupId);

//Set the ids
describeRequest.withGroupIds(groupIds);

securityGroup = ec2Client.describeSecurityGroups(describeRequest).getSecurityGroups()[0];