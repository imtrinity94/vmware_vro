/**
 * Scriptable task
 *
 * @param {AWS:EC2Vpc} vpc - [object Object]
 * @param {boolean} enableDnsSupport - [object Object]
 */
//Get the AmazonEC2 client
var client = vpc.getClient().getAmazonEC2Client();

//Initiate the ModifyVpcAttributeRequest
var modifyRequest = new EC2ModifyVpcAttributeRequest() ;

//Set properties
modifyRequest.setVpcId(vpc.getVpcId());
modifyRequest.setEnableDnsSupport(enableDnsSupport);

//Send the request
client.modifyVpcAttribute(modifyRequest);