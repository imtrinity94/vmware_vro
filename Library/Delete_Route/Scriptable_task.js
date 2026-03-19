/**
 * Scriptable task
 *
 * @param {AWS:EC2RouteTable} routeTable - [object Object]
 * @param {string} cidr - [object Object]
 */
//Get the AmazonEC2Client
var client = routeTable.getClient().getAmazonEC2Client();

//Init request
var deleteRequest = new EC2DeleteRouteRequest();

//Set options
deleteRequest.setDestinationCidrBlock(cidr);
deleteRequest.setRouteTableId(routeTable.getRouteTableId());

//Send request
client.deleteRoute(deleteRequest);