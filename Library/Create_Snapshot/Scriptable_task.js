/**
 * Scriptable task
 *
 * @param {AWS:EC2Volume} volume - [object Object]
 * @param {string} description - [object Object]
 * @return {AWS:EC2Snapshot} snapshot - [object Object]
 */
//Get the AmazonEC2Client
var client = volume.getClient().getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateSnapshotRequest();

//Set options
createRequest.setVolumeId(volume.getVolumeId());
createRequest.setDescription(description);

//Send the request
var response = client.createSnapshot(createRequest);

//Set the output object
snapshot = response.getSnapshot();