/**
 * Initialize
 *
 * @param {number} vnicIndex
 * @param {string} ipAddress
 * @param {string} externalAddress
 * @return {string} attrNicIndex
 * @return {string} attrIpAddress
 * @return {boolean} attrOneToOneNat
 */
attrIpAddress = ipAddress;
attrNicIndex = vnicIndex.toString();
attrOneToOneNat = false;

if (ipAddress) {
	if (externalAddress) {
		attrOneToOneNat = true;
	}
}
