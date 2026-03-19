/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {AWS:EC2InstanceType} instanceType - [object Object]
 * @return {AWS:EC2Instance} result - [object Object]
 */
//Get the AmazonEC2Client
var client = instance.getClient().getAmazonEC2Client();

//Init the request
var modifyRequest = new EC2ModifyInstanceAttributeRequest();

//Set instance type
modifyRequest.setInstanceType(instanceType.toString());
modifyRequest.setInstanceId(instance.getInstanceId());

//Send the request
client.modifyInstanceAttribute(modifyRequest);

result = instance;