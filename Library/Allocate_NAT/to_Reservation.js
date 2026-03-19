/**
 * Simple task with custom script capability.
 *
 * @param {boolean} createFixedAddress
 * @param {boolean} createReservation
 * @param {boolean} attrReconfigure
 * @param {string} attrReconfigureMAC
 * @return {boolean} attrcreateFixedAddress
 * @return {boolean} attrcreateReservation
 * @return {string} attrmacAddress
 */
if (attrReconfigure) {
	attrmacAddress=attrReconfigureMAC;
	attrcreateFixedAddress = createFixedAddress;
	attrcreateReservation = createReservation;
} else { 
	attrcreateFixedAddress = false;
	attrcreateReservation = true;
}