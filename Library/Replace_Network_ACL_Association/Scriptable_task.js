/**
 * Scriptable task
 *
 * @param {AWS:EC2NetworkAcl} networkAcl - [object Object]
 * @param {string} associationId - [object Object]
 * @return {string} newAssociationId - [object Object]
 */
//Get the AmazonEC2Client
var client = networkAcl.getClient().getAmazonEC2Client();

//Init the request
var replaceRequest = new EC2ReplaceNetworkAclAssociationRequest();

//Set the options
replaceRequest.setAssociationId(associationId);
replaceRequest.setNetworkAclId(networkAcl.getNetworkAclId());

//Send the request
var response = client.replaceNetworkAclAssociation(replaceRequest);

newAssociationId = response.getNewAssociationId();