/**
 * Scriptable task
 *
 * @param {AWS:EC2Volume} volume - [object Object]
 * @param {boolean} force - [object Object]
 */
//Get the AmazonEC2Client
var client = volume.getClient().getAmazonEC2Client();

//Initiate the request
var detachRequest = new EC2DetachVolumeRequest() ;

//Set the options
detachRequest.setVolumeId(volume.getVolumeId());
detachRequest.setForce(force);

//Send the request
client.detachVolume(detachRequest);