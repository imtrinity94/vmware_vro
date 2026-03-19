/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client - [object Object]
 * @param {string} keyName - [object Object]
 * @param {string} keyMaterial - [object Object]
 * @return {string} keyFingerprint - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

var importRequest = new EC2ImportKeyPairRequest();

//Set options
importRequest.setKeyName(keyName);
importRequest.setPublicKeyMaterial(keyMaterial);

//Send the request
var response = ec2Client.importKeyPair(importRequest);

keyFingerprint = response.getKeyFingerprint();