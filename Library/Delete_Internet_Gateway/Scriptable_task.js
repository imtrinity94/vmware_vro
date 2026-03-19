/**
 * Scriptable task
 *
 * @param {AWS:EC2InternetGateway} internetGateway - [object Object]
 */
//Get the AmazonEC2Client
var client = internetGateway.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteInternetGatewayRequest();

//Set the gateway id
deleteRequest.setInternetGatewayId(internetGateway.getInternetGatewayId());

//Send the request
client.deleteInternetGateway(deleteRequest);