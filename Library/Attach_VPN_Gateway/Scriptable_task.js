/**
 * Scriptable task
 *
 * @param {AWS:EC2VpnGateway} vpnGateway - [object Object]
 * @param {AWS:EC2Vpc} vpc - [object Object]
 */
//Get the AmazonEC2Client
var client = vpnGateway.getClient().getAmazonEC2Client();

//Init the request
var attachRequest = new EC2AttachVpnGatewayRequest();

//Set the options
attachRequest.setVpcId(vpc.getVpcId());
attachRequest.setVpnGatewayId(vpnGateway.getVpnGatewayId());

//Send the request
client.attachVpnGateway(attachRequest);