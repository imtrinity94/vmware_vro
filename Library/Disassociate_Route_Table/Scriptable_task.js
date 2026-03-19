/**
 * Scriptable task
 *
 * @param {string} associationId - [object Object]
 * @param {AWS:EC2RouteTable} routeTable - [object Object]
 */
//Get the AmazonEC2Client
var client = routeTable.getClient().getAmazonEC2Client();

//Init request
var disassociateRequest = new EC2DisassociateRouteTableRequest() ;

//Set association id
disassociateRequest.setAssociationId(associationId);

//Send request
client.disassociateRouteTable(disassociateRequest);