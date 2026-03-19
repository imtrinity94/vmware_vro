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

//Init request
var replaceRequest = new EC2ReplaceRouteRequest();

//Set options
replaceRequest.setRouteTableId(routeTable.getRouteTableId());
if (networkInterface != null) {
	replaceRequest.setNetworkInterfaceId(networkInterface.getNetworkInterfaceId());
}
if (instance != null) {
	replaceRequest.setInstanceId(instance.getInstanceId());
}
if (gateway != null) {
	replaceRequest.setGatewayId(gateway.getInternetGatewayId());
}
replaceRequest.setDestinationCidrBlock(cidr);

//Send request
client.replaceRoute(replaceRequest);