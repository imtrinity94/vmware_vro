/**
 * Log the input text to the console log with level 'log'
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {boolean} removeHostRecord
 * @param {boolean} removeAddressRecord
 * @param {boolean} removeAddressAndPtrRecords
 * @param {boolean} removeFixedAddress
 * @param {boolean} removeReservation
 * @param {string} resourceId
 * @param {number} vnicIndex
 */
System.log("Release External, Routed started...");
var text = "Got workflow parameters:"

text += "\n\tipamConnection ID: " + ipamConnection.id;

text += "\n\tremoveHostRecord: " + removeHostRecord;
text += "\n\tremoveAddressRecord: " + removeAddressRecord;
text += "\n\tremoveAddressAndPtrRecords: " + removeAddressAndPtrRecords;
text += "\n\tremoveFixedAddress: " + removeFixedAddress;
text += "\n\tremoveReservation: " + removeReservation;

text += "\n\tresourceId: " + resourceId;
text += "\n\tvnicIndex: " + vnicIndex;

System.log(text);
