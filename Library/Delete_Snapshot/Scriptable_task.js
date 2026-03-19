/**
 * Scriptable task
 *
 * @param {AWS:EC2Snapshot} snapshot - [object Object]
 */
//Get the AmazonEC2Client
var client = snapshot.getClient().getAmazonEC2Client();

//Init the request
var deleteRequest = new EC2DeleteSnapshotRequest();

//Set snapshot id
deleteRequest.setSnapshotId(snapshot.getSnapshotId());

//Send the request
client.deleteSnapshot(deleteRequest);