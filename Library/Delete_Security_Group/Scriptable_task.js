/**
 * Scriptable task
 *
 * @param {AWS:EC2SecurityGroup} group - [object Object]
 */
//Get the AmazonEC2 client
var client = group.getClient().getAmazonEC2Client();

//Initiate the request
var deleteRequest = new EC2DeleteSecurityGroupRequest();

//Set the Group id
deleteRequest.setGroupId(group.getGroupId());

//Send the request
client.deleteSecurityGroup(deleteRequest);