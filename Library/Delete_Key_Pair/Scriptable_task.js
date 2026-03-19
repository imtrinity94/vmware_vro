/**
 * Scriptable task
 *
 * @param {AWS:EC2KeyPair} keyPair - [object Object]
 */
//Get the AmazonEC2Client
var client = keyPair.getClient().getAmazonEC2Client();

//Init the request
var deleteReqest = new EC2DeleteKeyPairRequest();

//Set the key pair name
deleteReqest.setKeyName(keyPair.getKeyName());

//Send the request
client.deleteKeyPair(deleteReqest);