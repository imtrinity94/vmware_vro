/**
 * Initialize Data
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {boolean} removeByEa
 * @param {number} eaNumber
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa1Definition
 * @param {string} searchEa1Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa1Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa2Definition
 * @param {string} searchEa2Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa2Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa3Definition
 * @param {string} searchEa3Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa3Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa4Definition
 * @param {string} searchEa4Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa4Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa5Definition
 * @param {string} searchEa5Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa5Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa6Definition
 * @param {string} searchEa6Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa6Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa7Definition
 * @param {string} searchEa7Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa7Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa8Definition
 * @param {string} searchEa8Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa8Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa9Definition
 * @param {string} searchEa9Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa9Comparison
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} searchEa10Definition
 * @param {string} searchEa10Value
 * @param {InfobloxIPAM:IpamSearchComparisonType} searchEa10Comparison
 * @return {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa1Definition
 * @return {string} attrSearchEa1Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa1Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa2Definition
 * @return {string} attrSearchEa2Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa2Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa3Definition
 * @return {string} attrSearchEa3Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa3Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa4Definition
 * @return {string} attrSearchEa4Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa4Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa5Definition
 * @return {string} attrSearchEa5Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa5Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa6Definition
 * @return {string} attrSearchEa6Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa6Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa7Definition
 * @return {string} attrSearchEa7Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa7Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa8Definition
 * @return {string} attrSearchEa8Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa8Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa9Definition
 * @return {string} attrSearchEa9Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa9Comparison
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa10Definition
 * @return {string} attrSearchEa10Value
 * @return {InfobloxIPAM:IpamSearchComparisonType} attrSearchEa10Comparison
 */
attrIpamConnection = ipamConnection;
if (attrIpamConnection) {
	System.log("Infoblox IPAM connection: " + attrIpamConnection.hostName);
} else {
	System.log("Infoblox IPAM connection is not specified");
}

if (!removeByEa) {
	eaNumber = 0;
}

if (eaNumber >= 1) {
	attrSearchEa1Definition = searchEa1Definition;
	attrSearchEa1Value = searchEa1Value;
	attrSearchEa1Comparison = searchEa1Comparison;
}

if (eaNumber >= 2) {
	attrSearchEa2Definition = searchEa2Definition;
	attrSearchEa2Value = searchEa2Value;
	attrSearchEa2Comparison = searchEa2Comparison;
}

if (eaNumber >= 3) {
	attrSearchEa3Definition = searchEa3Definition;
	attrSearchEa3Value = searchEa3Value;
	attrSearchEa3Comparison = searchEa3Comparison;
}

if (eaNumber >= 4) {
	attrSearchEa4Definition = searchEa4Definition;
	attrSearchEa4Value = searchEa4Value;
	attrSearchEa4Comparison = searchEa4Comparison;
}

if (eaNumber >= 5) {
	attrSearchEa5Definition = searchEa5Definition;
	attrSearchEa5Value = searchEa5Value;
	attrSearchEa5Comparison = searchEa5Comparison;
}

if (eaNumber >= 6) {
	attrSearchEa6Definition = searchEa6Definition;
	attrSearchEa6Value = searchEa6Value;
	attrSearchEa6Comparison = searchEa6Comparison;
}

if (eaNumber >= 7) {
	attrSearchEa7Definition = searchEa7Definition;
	attrSearchEa7Value = searchEa7Value;
	attrSearchEa7Comparison = searchEa7Comparison;
}

if (eaNumber >= 8) {
	attrSearchEa8Definition = searchEa8Definition;
	attrSearchEa8Value = searchEa8Value;
	attrSearchEa8Comparison = searchEa8Comparison;
}

if (eaNumber >= 9) {
	attrSearchEa9Definition = searchEa9Definition;
	attrSearchEa9Value = searchEa9Value;
	attrSearchEa9Comparison = searchEa9Comparison;
}

if (eaNumber >= 10) {
	attrSearchEa10Definition = searchEa10Definition;
	attrSearchEa10Value = searchEa10Value;
	attrSearchEa10Comparison = searchEa10Comparison;
}