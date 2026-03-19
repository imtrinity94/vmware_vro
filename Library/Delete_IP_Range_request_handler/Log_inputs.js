/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} ipRangeId - [object Object]
 */
System.log("Delete IP Range request handler started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\tipRangeId: " + ipRangeId;

System.log(text);
