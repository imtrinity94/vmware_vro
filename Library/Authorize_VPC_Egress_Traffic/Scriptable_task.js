/**
 * Scriptable task
 *
 * @param {AWS:EC2SecurityGroup} group - [object Object]
 * @param {string} protocol - [object Object]
 * @param {number} fromPort - [object Object]
 * @param {number} toPort - [object Object]
 * @param {string} cidr - [object Object]
 */
//Get the AmazonEC2Client
var client = group.getClient().getAmazonEC2Client();

//Init request
var authorizeRequest = new EC2AuthorizeSecurityGroupEgressRequest();

var permissionsArray = new Array();
var permission = new EC2IpPermission();

permission.setFromPort(fromPort);
permission.setToPort(toPort);
permission.setIpProtocol(protocol);

var ipRanges = new Array();
ipRanges.push(cidr);
permission.withIpRanges(ipRanges);

permissionsArray.push(permission);
authorizeRequest.withIpPermissions(permissionsArray);

//Set group id
authorizeRequest.setGroupId(group.getGroupId());

//Send request
client.authorizeSecurityGroupEgress(authorizeRequest);