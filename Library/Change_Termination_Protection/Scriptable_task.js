/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {boolean} disableApiTermination
 * @return {AWS:EC2Instance} result - [object Object]
 */
//Get the AmazonEC2Client
var client = instance.getClient().getAmazonEC2Client();

//Init the request
var modifyRequest = new EC2ModifyInstanceAttributeRequest();

//Set instance type
modifyRequest.setDisableApiTermination(disableApiTermination);
modifyRequest.setInstanceId(instance.getInstanceId());

//Send the request
client.modifyInstanceAttribute(modifyRequest);

result = instance;