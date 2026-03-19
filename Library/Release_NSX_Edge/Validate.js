/**
 * Validate
 *
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @param {boolean} removeAddressRecord
 * @param {boolean} removeFixedAddress
 * @param {boolean} removeHostRecord
 * @param {boolean} removeAddressAndPtrRecords
 * @param {boolean} removeReservation
 */
if (!resourceId) {
	throw "Resource ID is not initialized."
}

if (isNaN(vnicIndex)) {
	throw "Invalid NIC index.";
}
var text = "Got workflow parameters:"
text += "\n\tremoveHostRecord: " + removeHostRecord;
text += "\n\tremoveAddressRecord: " + removeAddressRecord;
text += "\n\tremoveAddressAndPtrRecords: " + removeAddressAndPtrRecords;
text += "\n\tremoveFixedAddress: " + removeFixedAddress;
text += "\n\tremoveReservation: " + removeReservation;
System.log(text);