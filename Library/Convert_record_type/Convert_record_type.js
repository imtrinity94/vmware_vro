/**
 * Convert record type
 *
 * @param {boolean} createHostRecord
 * @param {boolean} createAddressRecord
 * @param {boolean} createAddressAndPtrRecords
 * @param {boolean} createFixedAddress
 * @param {boolean} createReservation
 * @return {boolean} createHostRecordOut
 * @return {boolean} createAddressRecordOut
 * @return {boolean} createAssociatedPtrRecordOut
 * @return {boolean} createFixedAddressOut
 * @return {boolean} createReservationOut
 */
createHostRecordOut = createHostRecord;
createAddressRecordOut = createAddressRecord;
createFixedAddressOut = createFixedAddress;
createReservationOut = createReservation;

if (createAddressAndPtrRecords)  {
	createAddressRecordOut = true;
	createAssociatedPtrRecordOut = true;	
}
