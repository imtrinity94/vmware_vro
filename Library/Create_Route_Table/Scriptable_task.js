/**
 * Scriptable task
 *
 * @param {AWS:EC2Vpc} vpc - [object Object]
 * @return {AWS:AWSClient} client
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2RouteTable} routeTable - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = vpc.getClient().getAmazonEC2Client();

//Init request
var createRequest = new EC2CreateRouteTableRequest();

//Set the VPC ID
createRequest.setVpcId(vpc.getVpcId());

//Send the request
var response = ec2Client.createRouteTable(createRequest);

routeTable = response.getRouteTable();
resourceId = routeTable.getRouteTableId();
client = vpc.getClient();