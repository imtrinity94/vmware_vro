/**
 * Scriptable task
 *
 * @param {AWS:EC2RouteTable} routeTable - [object Object]
 * @param {string} cidr - [object Object]
 * @param {AWS:EC2InternetGateway} gateway - [object Object]
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {AWS:EC2NetworkInterface} networkInterface - [object Object]
 */
//Get the AmazonEC2Client
var client = routeTable.getClient().getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateRouteRequest() ;

//Set the options
createRequest.setDestinationCidrBlock(cidr);
if (gateway != null) {
	createRequest.setGatewayId(gateway.getInternetGatewayId());
}
if (instance != null) {
	createRequest.setInstanceId(instance.getInstanceId());
}
if (networkInterface != null) {
	createRequest.setNetworkInterfaceId(networkInterface.getNetworkInterfaceId());
}
createRequest.setRouteTableId(routeTable.getRouteTableId());

//Send the request
client.createRoute(createRequest);