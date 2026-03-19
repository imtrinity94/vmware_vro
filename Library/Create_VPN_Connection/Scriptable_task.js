/**
 * Scriptable task
 *
 * @param {string} type - [object Object]
 * @param {AWS:EC2CustomerGateway} customerGateway - [object Object]
 * @param {AWS:EC2VpnGateway} vpnGateway - [object Object]
 * @param {boolean} staticRoutesOnly - [object Object]
 */
//Get the AmazonEC2Client
var client = customerGateway.getClient().getAmazonEC2Client();

//Init request
var createRequest = new EC2CreateVpnConnectionRequest();

var specification = new EC2VpnConnectionOptionsSpecification();
specification.setStaticRoutesOnly(staticRoutesOnly);

//Set options
createRequest.setType(type);
createRequest.setVpnGatewayId(vpnGateway.getVpnGatewayId());
createRequest.setCustomerGatewayId(customerGateway.getCustomerGatewayId());
createRequest.setOptions(specification);

//Send the request
client.createVpnConnection(createRequest);