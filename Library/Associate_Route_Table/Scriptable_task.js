/**
 * Scriptable task
 *
 * @param {AWS:EC2RouteTable} routeTable - [object Object]
 * @param {AWS:EC2Subnet} subnet - [object Object]
 * @return {string} associationId - [object Object]
 */
//Get the AmazonEC2Client
var client = routeTable.getClient().getAmazonEC2Client();

//Init the request
var associateRequest = new EC2AssociateRouteTableRequest();

//Set options
associateRequest.setRouteTableId(routeTable.getRouteTableId());
associateRequest.setSubnetId(subnet.getSubnetId());

//Send request
var response = client.associateRouteTable(associateRequest);

associationId = response.getAssociationId();