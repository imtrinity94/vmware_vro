/**
 * Scriptable task
 *
 * @param {AWS:EC2InternetGateway} internetGateway - [object Object]
 * @param {AWS:EC2Vpc} vpc - [object Object]
 */
//Get the AmazonEC2Client
var client = internetGateway.getClient().getAmazonEC2Client();

//Init the request
var detachRequest = new EC2DetachInternetGatewayRequest();

//Set options
detachRequest.setVpcId(vpc.getVpcId());
detachRequest.setInternetGatewayId(internetGateway.getInternetGatewayId());

//Send the request
client.detachInternetGateway(detachRequest);