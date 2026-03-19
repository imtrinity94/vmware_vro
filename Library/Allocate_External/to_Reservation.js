/**
 * to Reservation
 *
 * @param {boolean} createFixedAddress
 * @param {boolean} createReservation
 * @param {boolean} attrReconfigure
 * @param {string} attrReconfigureMAC
 * @return {boolean} attrCreateFixedAddress
 * @return {boolean} attrCreateReservation
 * @return {string} attrMacAddress
 */
if (attrReconfigure) {
	attrMacAddress=attrReconfigureMAC;
	attrCreateFixedAddress = createFixedAddress;
	attrCreateReservation = createReservation;
} else { 
	attrCreateFixedAddress = false;
	attrCreateReservation = true;
}