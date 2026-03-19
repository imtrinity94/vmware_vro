/**
 * Scriptable task
 *
 * @param {AWS:EC2InternetGateway} internetGateway - [object Object]
 * @param {AWS:EC2Vpc} vpc - [object Object]
 */
//Get the AmazonEC2Client
var client = internetGateway.getClient().getAmazonEC2Client();

//Init the request
var attachRequest = new EC2AttachInternetGatewayRequest();

//Set the options
attachRequest.setVpcId(vpc.getVpcId());
attachRequest.setInternetGatewayId(internetGateway.getInternetGatewayId());

//Send the request
client.attachInternetGateway(attachRequest);