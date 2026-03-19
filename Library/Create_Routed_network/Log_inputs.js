/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} requestId
 * @param {Array/string} networkContainerIds
 * @param {number} networkCidr
 * @param {string} ipVersion
 * @param {boolean} restartIfNeeded
 * @param {string} networkProfileId
 * @param {string} blueprintRequestId
 */
System.log("Creating IP range for Routed network started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\trequestId: " + requestId;
text += "\n\tnetworkContainerIds: " + networkContainerIds;
text += "\n\tnetworkCidr: " + networkCidr;
text += "\n\tipVersion: " + ipVersion;

text += "\n\tnetworkProfileId: " + networkProfileId;
text += "\n\tblueprintRequestId: " + blueprintRequestId;

text += "\n\trestartIfNeeded: " + restartIfNeeded;

System.log(text);

