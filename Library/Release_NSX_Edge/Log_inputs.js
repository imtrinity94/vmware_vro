/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} resourceId
 * @param {number} vnicIndex
 */
System.log("Release NSX Edge started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\tresourceId: " + resourceId;
text += "\n\tvnicIndex: " + vnicIndex;

System.log(text);
