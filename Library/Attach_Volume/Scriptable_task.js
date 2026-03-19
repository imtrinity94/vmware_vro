/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client
 * @param {AWS:EC2Volume} volume - [object Object]
 * @param {string} device - [object Object]
 * @param {AWS:EC2Instance} instance - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

//Initiate the request
var attachRequest = new EC2AttachVolumeRequest();

//Set the options
attachRequest.setVolumeId(volume.getVolumeId());
attachRequest.setInstanceId(instance.getInstanceId());
attachRequest.setDevice(device);

//Send the request
ec2Client.attachVolume(attachRequest);