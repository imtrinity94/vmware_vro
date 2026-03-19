/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {Array/AWS:EC2SecurityGroup} securityGroups
 * @return {AWS:EC2Instance} result - [object Object]
 */
//Get the AmazonEC2Client
var client = instance.getClient().getAmazonEC2Client();

//Init the request
var modifyRequest = new EC2ModifyInstanceAttributeRequest();

//Set instance type
modifyRequest.setInstanceId(instance.getInstanceId());

//Set security groups
var groups = new Array();
for (var i = 0; i < securityGroups.length; i++) {
	groups.push(securityGroups[i].getGroupId());
}
modifyRequest.withGroups(groups);

//Send the request
client.modifyInstanceAttribute(modifyRequest);

result = instance;