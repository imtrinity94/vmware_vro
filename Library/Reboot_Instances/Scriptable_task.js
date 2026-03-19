/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance - [object Object]
 * @return {AWS:EC2Instance} result - [object Object]
 */
//Get the AmazonEC2 client
var client = instance.getClient().getAmazonEC2Client();

//Initiate request
var rebootRequest = new EC2RebootInstancesRequest();

var instanceIds = new Array();
var instanceId = instance.getInstanceId();
instanceIds.push(instanceId);

//Set the instance ids
rebootRequest.withInstanceIds(instanceIds);
System.log(rebootRequest);
//Send the request
client.rebootInstances(rebootRequest);

result = instance;