/**
 * Prepare data
 *
 * @param {Properties} vCACVmProperties
 * @param {boolean} attrCreateHostRecord
 * @param {boolean} attrCreateAddressRecord
 * @param {boolean} attrCreateAddressAndPtrRecords
 * @param {boolean} attrCreateFixedAddress
 * @param {boolean} attrCreateReservation
 * @param {boolean} attrEnableCustomHostname
 * @param {string} attrConditionalPropertyName0
 * @param {string} attrConditionalPropertyName1
 * @param {string} attrConditionalPropertyName2
 * @param {string} attrConditionalPropertyValue0
 * @param {string} attrConditionalPropertyValue1
 * @param {string} attrConditionalPropertyValue2
 * @return {boolean} attrUpdateHostRecord
 * @return {boolean} attrUpdateFixedAddress
 * @return {boolean} attrUpdateDnsRecords
 * @return {boolean} attrUpdateHostname
 */
attrUpdateHostRecord = attrCreateHostRecord;
attrUpdateFixedAddress = attrCreateFixedAddress || attrCreateReservation;
attrUpdateDnsRecords = attrCreateAddressRecord || attrCreateAddressAndPtrRecords;

if (attrEnableCustomHostname) {
	attrUpdateHostname = checkConditions();
}

function checkConditions() {
	if (attrConditionalPropertyName0) {
		if (checkProperty(attrConditionalPropertyName0, attrConditionalPropertyValue0)) {
			if (attrConditionalPropertyName1) {
				if (checkProperty(attrConditionalPropertyName1, attrConditionalPropertyValue1)) {
					if (attrConditionalPropertyName2) {
						return checkProperty(attrConditionalPropertyName2, attrConditionalPropertyValue2);
					}
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}

	return true;	// conditions were not specified
}

function checkProperty(key, expectedValue) {
	var value = vCACVmProperties.get(key);
	if (value && value == expectedValue) {
		return true;
	}

	return false
}