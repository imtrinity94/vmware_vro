/**
 * Validate
 *
 * @param {string} resourceId
 * @param {string} resourceName
 * @param {string} requestId
 * @param {number} vnicIndex
 * @param {boolean} createHostRecord
 * @param {boolean} createAddressRecord
 * @param {boolean} createAddressAndPtrRecords
 * @param {boolean} createFixedAddress
 * @param {boolean} createReservation
 * @param {Array/string} ipRanges
 */
if (!resourceId) {
	throw "Resource ID is not initialized.";
}

if (!resourceName) {
	throw "Resource name is not initialized.";
}

if (isNaN(vnicIndex)) {
	throw "Invalid NIC index.";
}

if (!createHostRecord && !createAddressRecord && !createAddressAndPtrRecords && !createFixedAddress && !createReservation) {
	throw "Error allocating IP address(es) because required custom properties are not set: at least one of the following custom properties"
		+ " [createHostRecord, createAddressRecord, createAddressAndPtrRecords, createFixedAddress, createReservation]"
		+ " has to be set to \"true\" to define IPAM record type, code: 1003";
}

if (ipRanges == null || ipRanges == undefined || ipRanges.length == 0) {
	throw "Error allocating IP address(es) because list of IP ranges is not initialized or empty, code: 1004";
}
