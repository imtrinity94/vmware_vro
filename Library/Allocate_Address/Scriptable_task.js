/**
 * Scriptable task
 *
 * @param {AWS:AWSClient} client - [object Object]
 * @param {AWS:EC2DomainType} domainType - [object Object]
 * @return {string} respDomain - [object Object]
 * @return {string} publicIp - [object Object]
 * @return {string} allocationId - [object Object]
 */
//Get the AmazonEC2Client
var ec2Client = client.getAmazonEC2Client();
System.log('1');
//Init request
var allocateRequest = new EC2AllocateAddressRequest();
System.log('2');
//Set domain of the request (usually vpc)
allocateRequest.setDomain(domainType);
System.log('3');
//Send request
var response = ec2Client.allocateAddress(allocateRequest);
System.log('4');
respDomain = response.getDomain();
publicIp = response.getPublicIp();
allocationId = response.getAllocationId();