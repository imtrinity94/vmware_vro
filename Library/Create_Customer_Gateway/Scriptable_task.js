/**
 * Scriptable task
 *
 * @param {AWS:EC2GatewayType} type - [object Object]
 * @param {string} ipAddress - [object Object]
 * @param {number} bgpAsn - [object Object]
 * @param {AWS:AWSClient} client - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2CustomerGateway} gateway - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateCustomerGatewayRequest();

//Set the options
createRequest.setPublicIp(ipAddress);
createRequest.setBgpAsn(bgpAsn);
createRequest.setType(type);

//Send the request
var response = ec2Client.createCustomerGateway(createRequest);

gateway = response.getCustomerGateway();

resourceId = response.getCustomerGateway().getCustomerGatewayId();