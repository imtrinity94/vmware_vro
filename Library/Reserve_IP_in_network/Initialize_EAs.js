/**
 * Initialize EAs
 *
 * @param {number} eaNumber
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea1Definition
 * @param {string} ea1Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea2Definition
 * @param {string} ea2Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea3Definition
 * @param {string} ea3Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea4Definition
 * @param {string} ea4Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea5Definition
 * @param {string} ea5Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea6Definition
 * @param {string} ea6Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea7Definition
 * @param {string} ea7Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea8Definition
 * @param {string} ea8Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea9Definition
 * @param {string} ea9Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea10Definition
 * @param {string} ea10Value
 * @param {InfobloxIPAM:IpamConnection} attrConnection
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa1Definition
 * @return {string} attrEa1Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa2Definition
 * @return {string} attrEa2Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa3Definition
 * @return {string} attrEa3Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa4Definition
 * @return {string} attrEa4Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa5Definition
 * @return {string} attrEa5Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa6Definition
 * @return {string} attrEa6Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa7Definition
 * @return {string} attrEa7Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa8Definition
 * @return {string} attrEa8Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa9Definition
 * @return {string} attrEa9Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa10Definition
 * @return {string} attrEa10Value
 */
if (eaNumber >= 1) {
	checkConnectionContainsDefinition(ea1Definition);
	attrEa1Definition = ea1Definition;
	attrEa1Value = ea1Value;
}

if (eaNumber >= 2) {
	checkConnectionContainsDefinition(ea2Definition);
	attrEa2Definition = ea2Definition;
	attrEa2Value = ea2Value;
}

if (eaNumber >= 3) {
	checkConnectionContainsDefinition(ea3Definition);
	attrEa3Definition = ea3Definition;
	attrEa3Value = ea3Value;
}

if (eaNumber >= 4) {
	checkConnectionContainsDefinition(ea4Definition);
	attrEa4Definition = ea4Definition;
	attrEa4Value = ea4Value;
}

if (eaNumber >= 5) {
	checkConnectionContainsDefinition(ea5Definition);
	attrEa5Definition = ea5Definition;
	attrEa5Value = ea5Value;
}

if (eaNumber >= 6) {
	checkConnectionContainsDefinition(ea6Definition);
	attrEa6Definition = ea6Definition;
	attrEa6Value = ea6Value;
}

if (eaNumber >= 7) {
	checkConnectionContainsDefinition(ea7Definition);
	attrEa7Definition = ea7Definition;
	attrEa7Value = ea7Value;
}

if (eaNumber >= 8) {
	checkConnectionContainsDefinition(ea8Definition);
	attrEa8Definition = ea8Definition;
	attrEa8Value = ea8Value;
}

if (eaNumber >= 9) {
	checkConnectionContainsDefinition(ea9Definition);
	attrEa9Definition = ea9Definition;
	attrEa9Value = ea9Value;
}

if (eaNumber >= 10) {
	checkConnectionContainsDefinition(ea10Definition);
	attrEa10Definition = ea10Definition;
	attrEa10Value = ea10Value;
}

function checkConnectionContainsDefinition(definition) {
	if (!System.getModule("com.infoblox.ipam.util").connectionContainsDefinition(attrConnection, definition)) {
		throw "Definition [" + definition.name + "] is not owned by specified IPAM connection [" + attrConnection.hostName
			+ "]. It is owned by IPAM connection [" + definition.getConnection().hostName + "].";
	}
}
