/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client - [object Object]
 * @param {AWS:EC2GatewayType} type - [object Object]
 * @param {AWS:EC2AvailabilityZone} availabilityZone - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2VpnGateway} gateway - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateVpnGatewayRequest();

//Set the options
if (availabilityZone != null) {
	createRequest.setAvailabilityZone(availabilityZone.getZoneName());
}
createRequest.setType(type);

//Send the request
var result = ec2Client.createVpnGateway(createRequest);

resourceId = result.getVpnGateway().getVpnGatewayId();

gateway = result.getVpnGateway();