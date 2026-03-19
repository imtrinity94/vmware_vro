/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2InternetGateway} gateway - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateInternetGatewayRequest();

//Send the request
var result = ec2Client.createInternetGateway(createRequest);

resourceId = result.getInternetGateway().getInternetGatewayId();

gateway = result.getInternetGateway();