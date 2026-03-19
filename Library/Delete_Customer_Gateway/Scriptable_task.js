/**
 * Scriptable task
 *
 * @param {AWS:EC2CustomerGateway} gateway - [object Object]
 */
//Get the AmazonEC2Client
var client = gateway.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteCustomerGatewayRequest() ;

//Set gateway ID
deleteRequest.setCustomerGatewayId(gateway.getCustomerGatewayId());

//Send the request
client.deleteCustomerGateway(deleteRequest);