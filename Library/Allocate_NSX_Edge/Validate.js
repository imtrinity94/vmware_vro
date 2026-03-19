/**
 * Validate
 *
 * @param {Array/string} ipRanges
 * @param {string} requestId
 * @param {string} resourceId
 * @param {string} resourceName
 * @param {number} vnicIndex
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

if (ipRanges == null || ipRanges == undefined || ipRanges.length == 0) {
	throw "Error allocating IP address(es) because list of IP ranges is not initialized or empty, code: 1004";
}
