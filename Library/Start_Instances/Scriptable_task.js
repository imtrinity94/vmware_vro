/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance
 * @param {string} additionalInfo - [object Object]
 * @return {AWS:EC2Instance} result - [object Object]
 */
//Get the AmazonEC2 client
var client = instance.getClient().getAmazonEC2Client();

//Initiate the request
var startRequest = new EC2StartInstancesRequest();

var instanceIds = new Array();
var instanceId = instance.getInstanceId();
instanceIds.push(instanceId);

startRequest.withInstanceIds(instanceIds);
startRequest.setAdditionalInfo(additionalInfo);

//Send the request
client.startInstances(startRequest);

result = instance;