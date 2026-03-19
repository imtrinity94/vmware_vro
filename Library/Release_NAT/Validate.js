/**
 * Validate
 *
 * @param {string} resourceId
 * @param {number} vnicIndex
 */
if (!resourceId) {
	throw "Resource ID is not initialized."
}

if (isNaN(vnicIndex)) {
	throw "Invalid NIC index.";
}
