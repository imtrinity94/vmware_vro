/**
 * Log the input text to the console log with level 'log'
 *
 * @param {Array/string} aliases
 * @param {number} blockSize
 * @param {string} comment
 * @param {boolean} createAddressAndPtrRecords
 * @param {boolean} createAddressRecord
 * @param {boolean} createFixedAddress
 * @param {boolean} createHostRecord
 * @param {boolean} createReservation
 * @param {string} dnsView
 * @param {boolean} enableDhcp
 * @param {boolean} enableDns
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {Array/string} ipRanges
 * @param {string} msDhcpServer
 * @param {string} networkView
 * @param {string} requestId
 * @param {string} resourceId
 * @param {string} resourceName
 * @param {boolean} restartIfNeeded
 * @param {string} startIp
 * @param {string} tenantId
 * @param {number} vnicIndex
 * @param {string} dnsSuffixOverride
 */
System.log("Allocate Routed started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\ttenantId: " + tenantId;
text += "\n\tresourceId: " + resourceId;
text += "\n\tresourceName: " + resourceName;

text += "\n\tcreateHostRecord: " + createHostRecord;
text += "\n\tcreateAddressRecord: " + createAddressRecord;
text += "\n\tcreateAddressAndPtrRecords: " + createAddressAndPtrRecords;
text += "\n\tcreateFixedAddress: " + createFixedAddress;
text += "\n\tcreateReservation: " + createReservation;
text += "\n\trestartIfNeeded: " + restartIfNeeded;

text += "\n\trequestId: " + requestId;
text += "\n\tnetworkView: " + networkView;
text += "\n\tipRanges: " + ipRanges;
text += "\n\tstartIp: " + startIp;
text += "\n\tblockSize: " + blockSize;
text += "\n\tvnicIndex: " + vnicIndex;

text += "\n\tdnsView: " + dnsView;
text += "\n\tcomment: " + comment;
text += "\n\taliases: " + aliases;
text += "\n\tmsDhcpServer: " + msDhcpServer;
text += "\n\tenableDhcp: " + enableDhcp;
text += "\n\tenableDns: " + enableDns;
text += "\n\tdnsSuffixOverride: " + dnsSuffixOverride;

System.log(text);
