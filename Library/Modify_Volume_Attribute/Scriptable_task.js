/**
 * Scriptable task
 *
 * @param {AWS:EC2Volume} volume - [object Object]
 * @param {boolean} autoEnableIO - [object Object]
 */
//Get the AmazonEC2 client
var client = volume.getClient().getAmazonEC2Client();

//Init the request
var modifyRequest = new EC2ModifyVolumeAttributeRequest();

//Set options
modifyRequest.setVolumeId(volume.getVolumeId());
modifyRequest.setAutoEnableIO(autoEnableIO);

//Send the request
client.modifyVolumeAttribute(modifyRequest);