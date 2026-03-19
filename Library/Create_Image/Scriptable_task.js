/**
 * Scriptable task
 *
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {string} name - [object Object]
 * @param {string} description - [object Object]
 * @param {boolean} noReboot - [object Object]
 * @return {string} imageId - [object Object]
 */
//Get the AmazonEC2Client
var client = instance.getClient().getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateImageRequest();

//Set the options
createRequest.setInstanceId(instance.getInstanceId());
createRequest.setName(name);
createRequest.setDescription(description);
createRequest.setNoReboot(noReboot);

var createResponse = client.createImage(createRequest);

imageId = createResponse.getImageId();