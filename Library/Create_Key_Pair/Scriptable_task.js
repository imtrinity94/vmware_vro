/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client - [object Object]
 * @param {string} keyName - [object Object]
 * @return {AWS:EC2KeyPair} keyPair - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();

//Init the request
var createRequest = new EC2CreateKeyPairRequest();

//Set key name
createRequest.setKeyName(keyName);

//Send request
var response = ec2Client.createKeyPair(createRequest);

keyPair = response.getKeyPair();
System.log(keyPair);