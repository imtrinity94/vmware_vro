/**
 * Initialize
 *
 * @param {Array/string} attrEaNames
 * @param {number} attrVnicNumber
 * @param {number} attrSearchEaNumber
 * @param {number} attrConditionalPropertiesNumber
 * @return {Array/Any} attrPropertyDefinitions
 * @return {number} attrTotalNumber
 */
var comparisonTypes = ["EQUAL", "EQUAL_CASE_INSENSITIVE", "NOT_EQUAL", "REGULAR_EXPRESSION", "LESS_OR_EQUAL", "GREATER_OR_EQUAL"];
var trueFalse = ["TRUE", "FALSE"]

attrPropertyDefinitions = [
	// Common properties
	{"name": "Infoblox.IPAM.createHostRecord", "label": "Create host record", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
	{"name": "Infoblox.IPAM.createAddressRecord", "label": "Create address record", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
	{"name": "Infoblox.IPAM.createAddressAndPtrRecords", "label": "Create address and PTR records", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
	{"name": "Infoblox.IPAM.createFixedAddress", "label": "Create fixed address", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
	{"name": "Infoblox.IPAM.createReservation", "label": "Create reservation", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
	{"name": "Infoblox.IPAM.restartIfNeeded", "label": "Restart IPAM services if needed", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
	{"name": "Infoblox.IPAM.enableCustomHostname", "label": "Enable custom hostnaming", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true},
];

for (var i = 0; i < attrVnicNumber; i++) {
	// Network/Range address
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "ipAddress"), "label": "Network" + i + ": IP address", "type": "STRING", "control": "TEXTBOX", "values": [], "required": true});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "subnetMask"), "label": "Network" + i + ": Subnet mask", "type": "STRING", "control": "TEXTBOX", "values": [], "required": true});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "netaddr"), "label": "Network" + i + ": Network address", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "cidr"), "label": "Network" + i + ": CIDR", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "startAddress"), "label": "Network" + i + ": Start address", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "endAddress"), "label": "Network" + i + ": End address", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "searchByEa"), "label": "Network" + i + ": Search by EA", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true});

	// Additional attributes
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "networkView"), "label": "Network" + i + ": Network view", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	attrPropertyDefinitions.push({"name": getPropertyName(i, "dnsView"), "label": "Network" + i + ": DNS view", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	attrPropertyDefinitions.push({"name": getPropertyName(i, "aliases"), "label": "Network" + i + ": Aliases", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	attrPropertyDefinitions.push({"name": getPropertyName(i, "comment"), "label": "Network" + i + ": Comment", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	attrPropertyDefinitions.push({"name": getPropertyName(i, "enableDhcp"), "label": "Network" + i + ": Enable for DHCP", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true});
	attrPropertyDefinitions.push({"name": getPropertyName(i, "enableDns"), "label": "Network" + i + ": Enable for DNS", "type": "STRING", "control": "DROPDOWN", "values": trueFalse, "required": true});
	attrPropertyDefinitions.push({"name": getPropertyName(i, "msDhcpServer"), "label": "Network" + i + ": MS DHCP server for fixed address", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});

	// DHCP options
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.gateway"), "label": "Network" + i + ": DHCP option [gateway]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.dnsSuffix"), "label": "Network" + i + ": DHCP option [dns suffix]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.dnsSearchSuffixes"), "label": "Network" + i + ": DHCP option [dns search suffixes]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.primaryDns"), "label": "Network" + i + ": DHCP option [primary DNS]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.secondaryDns"), "label": "Network" + i + ": DHCP option [secondary DNS]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.primaryWins"), "label": "Network" + i + ": DHCP option [primary WINS]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	//attrPropertyDefinitions.push({"name": getPropertyName(i, "dhcpOptions.secondaryWins"), "label": "Network" + i + ": DHCP option [secondary WINS]", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});

	/*for (var j = 1; j <= attrSearchEaNumber; j++) {
		// Search EAs
		attrPropertyDefinitions.push({"name": getSearchEaName(i, j, "Name"), "label": "Network" + i + ": EA" + j + " Name", "type": "STRING", "control": "DROPDOWN", "values": attrEaNames, "required": false});
		attrPropertyDefinitions.push({"name": getSearchEaName(i, j, "Value"), "label": "Network" + i + ": EA" + j + " Value", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
		attrPropertyDefinitions.push({"name": getSearchEaName(i, j, "Comparison"), "label": "Network" + i + ": EA" + j + " Comparison type", "type": "STRING", "control": "DROPDOWN", "values": comparisonTypes, "required": false});
	}*/
}

for (var i = 0; i < attrConditionalPropertiesNumber; i++) {
	attrPropertyDefinitions.push({"name": getCustomHostnameCondition(i, "Name"), "label": "Condition" + i + ": property name", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
	attrPropertyDefinitions.push({"name": getCustomHostnameCondition(i, "Value"), "label": "Condition" + i + ": property value", "type": "STRING", "control": "TEXTBOX", "values": [], "required": false});
}

attrTotalNumber = attrPropertyDefinitions.length;

function getPropertyName(vnicIndex, propName) {
	return "Infoblox.IPAM.Network" + vnicIndex + "." + propName;
}

function getSearchEaName(vnicIndex, eaIndex, propName) {
	return "Infoblox.IPAM.Network" + vnicIndex + ".searchEa" + eaIndex + propName;
}

function getCustomHostnameCondition(condIndex, propName) {
	return "Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty" + condIndex + "." + propName;
}
