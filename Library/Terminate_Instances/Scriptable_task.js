/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance
 * @return {AWS:EC2Instance} result - [object Object]
 */
//Get the AmazonEC2 client
var client = instance.getClient().getAmazonEC2Client();

//Initiate the TerminateInstancesRequest
var terminateRequest = new EC2TerminateInstancesRequest() ;

var instanceIds = new Array();
var instanceId = instance.getInstanceId();
instanceIds.push(instanceId);

//Set the instance ids
terminateRequest.withInstanceIds(instanceIds);

//Send the request
client.terminateInstances(terminateRequest);

result = instance;