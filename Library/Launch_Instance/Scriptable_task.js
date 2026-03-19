/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client
 * @param {AWS:EC2InstanceType} instanceType
 * @param {number} minCount - [object Object]
 * @param {number} maxCount - [object Object]
 * @param {Array/AWS:EC2SecurityGroup} securityGroups - [object Object]
 * @param {AWS:EC2AvailabilityZone} availabilityZone - [object Object]
 * @param {AWS:EC2Image} ami - [object Object]
 * @param {AWS:EC2KeyPair} keyPair - [object Object]
 * @param {AWS:EC2Subnet} subnet - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2Instance} instance - [object Object]
 */
//Get the AmazonEC2 client 
var ec2Client = client.getAmazonEC2Client();

//Initiate the RinInstancesRequest
var request = new EC2RunInstancesRequest();
request.setMinCount(minCount);
request.setMaxCount(maxCount);
request.setInstanceType(instanceType);

var securityGroupIds = new Array();

if (securityGroups != null) {
	//Set the security group ids
	for (var i = 0; i < securityGroups.length; i++) {
		var groupId = securityGroups[i].getGroupId();
		securityGroupIds.push(groupId);
	}
	System.log("Setting security group ids: " + securityGroupIds);
	request.withSecurityGroupIds(securityGroupIds);
}

//Set the availability zone
var placement = new EC2Placement(availabilityZone.getZoneName());
System.log("Setting availability zone: " + availabilityZone.getZoneName());
request.setPlacement(placement);

//Set the subnet
if (subnet != null) {
	request.setSubnetId(subnet.getSubnetId());
}

//Set the AMI
request.setImageId(ami.getImageId());

//Set the key pair
request.setKeyName(keyPair.getKeyName());

//Send the request 
System.log("Request: " + request);
var response = ec2Client.runInstances(request);
System.log("Response: " + response);

resourceId = response.getReservation().getInstances()[0].getInstanceId();
instance = response.getReservation().getInstances()[0];