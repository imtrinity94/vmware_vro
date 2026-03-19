/**
 * Convert EA properties
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {Properties} eaProperties
 * @return {number} eaNumberOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea1DefinitionOut
 * @return {string} ea1ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea2DefinitionOut
 * @return {string} ea2ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea3DefinitionOut
 * @return {string} ea3ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea4DefinitionOut
 * @return {string} ea4ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea5DefinitionOut
 * @return {string} ea5ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea6DefinitionOut
 * @return {string} ea6ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea7DefinitionOut
 * @return {string} ea7ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea8DefinitionOut
 * @return {string} ea8ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea9DefinitionOut
 * @return {string} ea9ValueOut
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea10DefinitionOut
 * @return {string} ea10ValueOut
 */
eaNumberOut = eaProperties.keys.length;
var currentEaName;

if (eaNumberOut > 0) {
	currentEaName = eaProperties.keys[0];
	ea1DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea1ValueOut = eaProperties.get(currentEaName);
	//System.log(ea1ValueOut);
}

if (eaNumberOut > 1) {
	currentEaName = eaProperties.keys[1];
	ea2DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea2ValueOut = eaProperties.get(currentEaName);
	//System.log(ea2ValueOut);
}

if (eaNumberOut > 2) {
	currentEaName = eaProperties.keys[2];
	ea3DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea3ValueOut = eaProperties.get(currentEaName);
	//System.log(ea3ValueOut);
}

if (eaNumberOut > 3) {
	currentEaName = eaProperties.keys[3];
	ea4DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea4ValueOut = eaProperties.get(currentEaName);
	//System.log(ea4ValueOut);
}

if (eaNumberOut > 4) {
	currentEaName = eaProperties.keys[4];
	ea5DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea5ValueOut = eaProperties.get(currentEaName);
	//System.log(ea5ValueOut);
}

if (eaNumberOut > 5) {
	currentEaName = eaProperties.keys[5];
	ea6DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea6ValueOut = eaProperties.get(currentEaName);
	//System.log(ea6ValueOut);
}

if (eaNumberOut > 6) {
	currentEaName = eaProperties.keys[6];
	ea7DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea7ValueOut = eaProperties.get(currentEaName);
	//System.log(ea7ValueOut);
}

if (eaNumberOut > 7) {
	currentEaName = eaProperties.keys[7];
	ea8DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea8ValueOut = eaProperties.get(currentEaName);
	//System.log(ea8ValueOut);
}

if (eaNumberOut > 8) {
	currentEaName = eaProperties.keys[8];
	ea9DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea9ValueOut = eaProperties.get(currentEaName);
    //System.log(ea9ValueOut);
}

if (eaNumberOut > 9) {
	currentEaName = eaProperties.keys[9];
	ea10DefinitionOut = ipamConnection.getExtensibleAttributeDefinition(currentEaName);
	ea10ValueOut = eaProperties.get(currentEaName);
	//System.log(ea10ValueOut);
}