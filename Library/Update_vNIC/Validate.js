/**
 * Validate
 *
 * @param {boolean} updateHostRecord
 * @param {boolean} updateFixedAddress
 * @param {boolean} updateDnsRecords
 * @param {boolean} updateHostname
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @param {string} vmName
 * @param {string} ipAddress
 * @param {string} macAddress
 */
if (!resourceId) {
	throw "Resource ID is not initialized."
}

if (vnicIndex == null || vnicIndex == undefined) {
	throw "NIC index is not initialized.";
}

if (isNaN(vnicIndex)) {
	throw "Invalid NIC index.";
}

if ((updateHostRecord || updateFixedAddress) && !macAddress) {
	throw "MAC address is not initialized."
}

if (updateHostRecord && !ipAddress) {
	throw "IP address is not initialized."
}

if (updateHostname && !vmName) {
	throw "VM name is not initialized."
}
