/**
 * Scriptable task
 *
 * @param {AWS:EC2Volume} volume
 */
//Get the AmazonEC2Client
var client = volume.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteVolumeRequest();

//Set the options
deleteRequest.setVolumeId(volume.getVolumeId());

//Send the request
client.deleteVolume(deleteRequest);