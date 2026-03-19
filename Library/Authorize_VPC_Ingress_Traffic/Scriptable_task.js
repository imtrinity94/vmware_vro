/**
 * Scriptable task
 *
 * @param {AWS:EC2SecurityGroup} group
 * @param {string} protocol
 * @param {number} fromPort
 * @param {number} toPort
 * @param {string} cidr
 */
var client = group.getClient().getAmazonEC2Client();

//Init request
var authorizeRequest = new EC2AuthorizeSecurityGroupIngressRequest();

authorizeRequest.setGroupId(group.getGroupId());

var permissionsArray = new Array();

var permission = new EC2IpPermission();
permission.setFromPort(fromPort);
permission.setToPort(toPort);
permission.setIpProtocol(protocol);

var ipRanges = new Array();
ipRanges.push(cidr);
permission.withIpRanges(ipRanges);

permissionsArray.push(permission);

//Set permissions array
authorizeRequest.withIpPermissions(permissionsArray);

//Send request
client.authorizeSecurityGroupIngress(authorizeRequest);