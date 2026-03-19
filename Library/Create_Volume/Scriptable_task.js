/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client
 * @param {number} size - [object Object]
 * @param {AWS:EC2Snapshot} snapshot - [object Object]
 * @param {AWS:EC2AvailabilityZone} availabilityZone - [object Object]
 * @param {AWS:EC2VolumeType} volumeType - [object Object]
 * @param {number} iops - [object Object]
 * @return {string} resourceId - [object Object]
 * @return {AWS:EC2Volume} volume - [object Object]
 */
//Get the AmazonEC2 client
var ec2Client = client.getAmazonEC2Client();

//Initiate the request
var createRequest = new EC2CreateVolumeRequest();

//Set the options
createRequest.setAvailabilityZone(availabilityZone.getZoneName());
createRequest.setIops(iops);
createRequest.setSize(size);
if (snapshot != null) {
	createRequest.withSnapshotId(snapshot.getSnapshotId());
}
if (volumeType != null) {
	createRequest.setVolumeType(volumeType);
}

//Send the request
var result = ec2Client.createVolume(createRequest);

volume = result.getVolume();
resourceId = volume.getVolumeId();