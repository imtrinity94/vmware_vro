/**
 * Simple task with custom script capability.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} tenantId
 * @param {string} dnsSuffixOverride
 * @param {string} resourceId
 * @param {string} resourceName
 * @param {string} requestId
 * @param {Array/string} ipRanges
 * @param {string} startIp
 * @param {number} blockSize
 * @param {number} vnicIndex
 * @param {string} comment
 * @param {boolean} createHostRecord
 * @param {boolean} createAddressRecord
 * @param {boolean} createAddressAndPtrRecords
 * @param {boolean} createReservation
 * @param {boolean} createFixedAddress
 * @param {boolean} restartIfNeeded
 * @param {string} dnsView
 * @param {string} networkView
 */
System.log("Allocate NAT started...");
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

text += "\n\tcreateHostRecord: " + createHostRecord;
text += "\n\tcreateAddressRecord: " + createAddressRecord;
text += "\n\tcreateAddressAndPtrRecords: " + createAddressAndPtrRecords;
text += "\n\tcreateFixedAddress: " + createFixedAddress;
text += "\n\tcreateReservation: " + createReservation;
text += "\n\trestartIfNeeded: " + restartIfNeeded;

text += "\n\tcomment: " + comment;
text += "\n\tdnsSuffixOverride: " + dnsSuffixOverride;
System.log(text);