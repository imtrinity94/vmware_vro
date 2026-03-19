/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} tenantId - [object Object]
 * @param {string} resourceId - [object Object]
 * @param {string} resourceName - [object Object]
 * @param {string} requestId - [object Object]
 * @param {string} networkView - [object Object]
 * @param {Array/string} ipRanges - [object Object]
 * @param {string} startIp - [object Object]
 * @param {number} blockSize - [object Object]
 * @param {number} vnicIndex - [object Object]
 * @param {string} comment - [object Object]
 * @param {string} networkProfileId - [object Object]
 * @param {string} bpRequestId - [object Object]
 * @param {string} networkProfileType - [object Object]
 * @param {boolean} isPrimary - [object Object]
 * @param {string} dnsSuffixOverride
 */
System.log("Allocate NSX Edge started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\ttenantId: " + tenantId;
text += "\n\tresourceId: " + resourceId;
text += "\n\tresourceName: " + resourceName;

text += "\n\trequestId: " + requestId;
text += "\n\tnetworkView: " + networkView;
text += "\n\tipRanges: " + ipRanges;
text += "\n\tstartIp: " + startIp;
text += "\n\tblockSize: " + blockSize;
text += "\n\tvnicIndex: " + vnicIndex;

text += "\n\tcomment: " + comment;

text += "\n\tbpRequestId: " + bpRequestId;
text += "\n\tnetworkProfileId: " + networkProfileId;
text += "\n\tnetworkProfileType: " + networkProfileType;
text += "\n\tisPrimary: " + isPrimary;
text += "\n\tdnsSuffixOverride: " + dnsSuffixOverride;

System.log(text);
