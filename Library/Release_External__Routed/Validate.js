/**
 * Validate
 *
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @param {boolean} removeHostRecord
 * @param {boolean} removeAddressRecord
 * @param {boolean} removeAddressAndPtrRecords
 * @param {boolean} removeFixedAddress
 * @param {boolean} removeReservation
 * @param {boolean} AandPTRrecordonly
 * @return {boolean} AandPTRrecordonly
 */
if (!resourceId) {
	throw "Resource ID is not initialized."
}

if (isNaN(vnicIndex)) {
	throw "Invalid NIC index.";
}

if (!removeHostRecord && !removeAddressRecord && !removeAddressAndPtrRecords && !removeFixedAddress && !removeReservation) {
	throw "Error releasing IP address(es) because required custom properties are not set: at least one of the following custom properties"
		+ " [removeHostRecord, removeAddressRecord, removeAddressAndPtrRecords, removeFixedAddress, removeReservation]"
		+ " has to be set to \"true\" to define IPAM record type, code: 1009";
}
if (!removeFixedAddress && !removeReservation)
{
	 AandPTRrecordonly = true;
}