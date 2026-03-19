/**
 * Scriptable task
 *
 * @param {AWS:EC2VpnGateway} vpnGateway - [object Object]
 */
//Get the AmazonEC2Client
var client = vpnGateway.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteVpnGatewayRequest();

//Set the options
deleteRequest.setVpnGatewayId(vpnGateway.getVpnGatewayId());

//Send the request
client.deleteVpnGateway(deleteRequest);