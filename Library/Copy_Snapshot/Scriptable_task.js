/**
 * Scriptable task
 *
 * @param {AWS:EC2Snapshot} snapshot - [object Object]
 * @param {AWS:AWSRegion} sourceRegion - [object Object]
 * @param {string} description - [object Object]
 */
//Get the AmazonEC2Client
var client = snapshot.getClient().getAmazonEC2Client();

//Init the request
var copyRequest = new EC2CopySnapshotRequest();

//Set options
copyRequest.setDescription(description);
copyRequest.setSourceRegion(sourceRegion.name);
copyRequest.setSourceSnapshotId(snapshot.getSnapshotId());

//Send the request
client.copySnapshot(copyRequest);