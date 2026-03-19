/**
 * Simple task with custom script capability.
 *
 * @param {boolean} createHostRecord
 * @param {boolean} createFixedAddress
 * @param {boolean} createAddressRecord
 * @param {boolean} createAddressAndPtrRecords
 * @param {boolean} createReservation
 * @param {string} dnsView
 * @param {string} networkView
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {boolean} restartIfNeeded
 * @return {boolean} attrcreateHostRecord
 * @return {boolean} attrcreateFixedAddress
 * @return {boolean} attrcreateAddressRecord
 * @return {boolean} attrcreateAddressAndPtrRecords
 * @return {boolean} attrcreateReservation
 * @return {string} attrdnsView
 * @return {boolean} attrRestartIfNeeded
 */
attrcreateHostRecord = createHostRecord;
attrcreateAddressRecord = createAddressRecord;
attrcreateAddressAndPtrRecords = createAddressAndPtrRecords;
attrcreateFixedAddress = createFixedAddress;
attrcreateReservation = createReservation;
attrdnsView = dnsView;
attrRestartIfNeeded = restartIfNeeded;
