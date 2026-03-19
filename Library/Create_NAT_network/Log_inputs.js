/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} requestId
 * @param {string} startAddress
 * @param {string} endAddress
 * @param {number} networkCidr
 * @param {string} ipVersion
 * @param {string} gateway
 * @param {string} primaryDns
 * @param {string} secondaryDns
 * @param {string} primaryWins
 * @param {string} secondaryWins
 * @param {string} dnsSuffix
 * @param {Array/string} dnsSearchSuffixes
 * @param {boolean} restartIfNeeded
 * @param {string} networkProfileId
 * @param {string} externalNetworkProfileId
 * @param {string} blueprintRequestId
 */
System.log("Creating IP range for NAT network started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\trequestId: " + requestId;
text += "\n\tstartAddress: " + startAddress;
text += "\n\tendAddress: " + endAddress;
text += "\n\tnetworkCidr: " + networkCidr;
text += "\n\tipVersion: " + ipVersion;

text += "\n\tgateway: " + gateway;
text += "\n\tprimaryDns: " + primaryDns;
text += "\n\tsecondaryDns: " + secondaryDns;
text += "\n\tprimaryWins: " + primaryWins;
text += "\n\tsecondaryWins: " + secondaryWins;
text += "\n\tdnsSuffix: " + dnsSuffix;
text += "\n\tdnsSearchSuffixes: " + dnsSearchSuffixes;

text += "\n\tnetworkProfileId: " + networkProfileId;
text += "\n\texternalNetworkProfileId: " + externalNetworkProfileId;
text += "\n\tblueprintRequestId: " + blueprintRequestId;

text += "\n\trestartIfNeeded: " + restartIfNeeded;

System.log(text);
