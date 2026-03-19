/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance
 * @param {boolean} forceStop - [object Object]
 * @return {AWS:EC2Instance} result
 */
//Get the AmazonEC2 client
var client = instance.getClient().getAmazonEC2Client();

//Initiate the StopInstancesRequest
var stopRequest = new EC2StopInstancesRequest();

var instanceIds = new Array();

//Set the instance id
var instanceId = instance.getInstanceId();
instanceIds.push(instanceId);
stopRequest.withInstanceIds(instanceIds);

//Set force stop flag
stopRequest.setForce(forceStop);

//Send the request
client.stopInstances(stopRequest);

result = instance;