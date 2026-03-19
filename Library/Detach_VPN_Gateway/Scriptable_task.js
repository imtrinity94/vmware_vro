/**
 * Scriptable task
 *
 * @param {AWS:EC2VpnGateway} vpnGateway - [object Object]
 * @param {AWS:EC2Vpc} vpc - [object Object]
 */
//Get the AmazonEC2Client
var client = vpnGateway.getClient().getAmazonEC2Client();

//Initi the request
var detachRequest = new EC2DetachVpnGatewayRequest();

//Set the options
detachRequest.setVpcId(vpc.getVpcId());
detachRequest.setVpnGatewayId(vpnGateway.getVpnGatewayId());

client.detachVpnGateway(detachRequest);