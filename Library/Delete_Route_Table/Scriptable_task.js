/**
 * Scriptable task
 *
 * @param {AWS:EC2RouteTable} routeTable - [object Object]
 */
//Get the AmazonEC2Client
var client = routeTable.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteRouteTableRequest();

//Set route table id
deleteRequest.setRouteTableId(routeTable.getRouteTableId());

//Send the request
client.deleteRouteTable(deleteRequest);