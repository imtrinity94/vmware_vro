/**
 * Scriptable task
 *
 * @param {AWS:EC2NetworkInterface} networkInterface - [object Object]
 * @param {AWS:EC2Instance} instance - [object Object]
 * @param {number} deviceIndex - [object Object]
 */
//Get the AmazonEC2Client
var client = networkInterface.getClient().getAmazonEC2Client();

//Init the request
var attachRequest = new EC2AttachNetworkInterfaceRequest();

//Set the options
attachRequest.setNetworkInterfaceId(networkInterface.getNetworkInterfaceId());
attachRequest.setInstanceId(instance.getInstanceId());
attachRequest.setDeviceIndex(deviceIndex);

//Send the request
client.attachNetworkInterface(attachRequest);