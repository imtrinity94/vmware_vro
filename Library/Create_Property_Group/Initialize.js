/**
 * Initialize
 *
 * @param {vCACCAFE:VCACHost} host
 * @param {string} visibility
 * @param {boolean} createHostRecord
 * @param {boolean} createDnsRecord
 * @param {boolean} createDhcpRecord
 * @param {string} dnsRecordType
 * @param {string} dhcpRecordType
 * @param {boolean} restartIfNeeded
 * @param {number} vnicNumber
 * @param {number} eaNumber
 * @param {string} dnsView1
 * @param {string} dnsView2
 * @param {string} dnsView3
 * @param {string} dnsView4
 * @param {Array/string} aliases1
 * @param {Array/string} aliases2
 * @param {Array/string} aliases3
 * @param {Array/string} aliases4
 * @param {boolean} enableDns1
 * @param {boolean} enableDns2
 * @param {boolean} enableDns3
 * @param {boolean} enableDns4
 * @param {boolean} enableDhcp1
 * @param {boolean} enableDhcp2
 * @param {boolean} enableDhcp3
 * @param {boolean} enableDhcp4
 * @param {string} msDhcpServer1
 * @param {string} msDhcpServer2
 * @param {string} msDhcpServer3
 * @param {string} msDhcpServer4
 * @param {string} comment1
 * @param {string} comment2
 * @param {string} comment3
 * @param {string} comment4
 * @param {Array/string} attrDnsRecordTypes
 * @param {Array/string} attrDhcpRecordTypes
 * @param {boolean} enableCustomHostname
 * @param {boolean} autodetectCustomHostname
 * @param {boolean} useDefaultConditionalProperties
 * @param {number} conditionalPropertiesNumber
 * @param {string} conditionalPropertyName1
 * @param {string} conditionalPropertyName2
 * @param {string} conditionalPropertyName3
 * @param {string} conditionalPropertyValue1
 * @param {string} conditionalPropertyValue2
 * @param {string} conditionalPropertyValue3
 * @return {string} attrTenantId
 * @return {Array/Properties} attrProperties
 */
attrTenantId = (visibility == "Host's tenant" ? host.tenant : null);

if (createHostRecord == false && createDnsRecord == false && createDhcpRecord == false) {
	throw "Error creating property group because type of record is not specified."
}

if (createHostRecord) {
	createDnsRecord = false;
	createDhcpRecord = false;
}

var createHostRecordValue = createHostRecord ? "TRUE" : "FALSE";
var createAddressRecordValue = createDnsRecord && dnsRecordType == attrDnsRecordTypes[0] ? "TRUE" : "FALSE";
var createAddressAndPtrRecordsValue = createDnsRecord && dnsRecordType == attrDnsRecordTypes[1] ? "TRUE" : "FALSE";
var createFixedAddressValue = createDhcpRecord && dhcpRecordType == attrDhcpRecordTypes[0] ? "TRUE" : "FALSE";
var createReservationValue = createDhcpRecord && dhcpRecordType == attrDhcpRecordTypes[1] ? "TRUE" : "FALSE";
var restartIfNeededValue = restartIfNeeded ? "TRUE" : "FALSE";
var enableCustomHostnameValue = enableCustomHostname ? "TRUE" : "FALSE";

var attrProperties = [
	//new Properties({"name": "ExternalWFStubs.BuildingMachine", "defaultValue": "d7f6ebb1-3a34-4e02-ac4e-f5a9c369c92b"}),
	new Properties({"name": "ExternalWFStubs.MachineProvisioned", "defaultValue": "712f2f72-701d-459a-84f5-4bbec0cbd5cc"}),
	//new Properties({"name": "ExternalWFStubs.MachineDisposing", "defaultValue": "75480f46-937d-488c-852d-cafe52077095"}),
	new Properties({"name": "Infoblox.IPAM.createHostRecord", "defaultValue": createHostRecordValue}),
	new Properties({"name": "Infoblox.IPAM.createAddressRecord", "defaultValue": createAddressRecordValue}),
	new Properties({"name": "Infoblox.IPAM.createAddressAndPtrRecords", "defaultValue": createAddressAndPtrRecordsValue}),
	new Properties({"name": "Infoblox.IPAM.createFixedAddress", "defaultValue": createFixedAddressValue}),
	new Properties({"name": "Infoblox.IPAM.createReservation", "defaultValue": createReservationValue}),
	//new Properties({"name": "Infoblox.IPAM.vmName", "defaultValue": ""}),
	//new Properties({"name": "Infoblox.IPAM.vNicNumber", "defaultValue": vnicNumber.toString()}),
	new Properties({"name": "Infoblox.IPAM.restartIfNeeded", "defaultValue": restartIfNeededValue}),
	//new Properties({"name": "Infoblox.IPAM.Network0.netaddr", "defaultValue": ""}),
	//new Properties({"name": "Infoblox.IPAM.Network0.cidr", "defaultValue": ""}),
	//new Properties({"name": "Infoblox.IPAM.Network0.searchByEa", "defaultValue": ""}),
	new Properties({"name": "Infoblox.IPAM.enableCustomHostname", "defaultValue": enableCustomHostnameValue})
];

//var ipamPrefix = "Infoblox.IPAM";
//var intPrefix = ".Network";
//var eaPrefix = ".searchEa";
var dnsViewArray = [dnsView1, dnsView2, dnsView3, dnsView4];
var aliasesArray = [aliases1, aliases2, aliases3, aliases4];
var commentArray = [comment1, comment2, comment3, comment4];
var enableDnsArray = [enableDns1, enableDns2, enableDns3, enableDns4];
var enableDhcpArray = [enableDhcp1, enableDhcp2, enableDhcp3, enableDhcp4];
var msDhcpServerArray = [msDhcpServer1, msDhcpServer2, msDhcpServer3, msDhcpServer4];
var condPropNameArray = [conditionalPropertyName1, conditionalPropertyName2, conditionalPropertyName3];
var condPropValueArray = [conditionalPropertyValue1, conditionalPropertyValue2, conditionalPropertyValue3];

for (i = 0; i < vnicNumber; i++) {
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".networkView", "defaultValue": "default"}));
	attrProperties.push(new Properties({"name": getFullName(i, "dnsView"), "defaultValue": getDnsViewValue(i)}));
	attrProperties.push(new Properties({"name": getFullName(i, "aliases"), "defaultValue": getAliaseValue(i)}));
	attrProperties.push(new Properties({"name": getFullName(i, "comment"), "defaultValue": commentArray[i]}));
	attrProperties.push(new Properties({"name": getFullName(i, "enableDns"), "defaultValue": getEnableDnsValue(i)}));
	attrProperties.push(new Properties({"name": getFullName(i, "enableDhcp"), "defaultValue": getEnableDhcpValue(i)}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".fixedAddressOrReservationName", "defaultValue": ""}));
	attrProperties.push(new Properties({"name": getFullName(i, "msDhcpServer"), "defaultValue": getMsDhcpServerValue(i)}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".portGroup", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.gateway", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.dnsSuffix", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.dnsSearchSuffixes", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.primaryDns", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.secondaryDns", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.primaryWins", "defaultValue": ""}));
	//attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + ".dhcpOptions.secondaryWins", "defaultValue": ""}));
		
	/*for(j = 1; j <= eaNumber; j++) {
		attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + eaPrefix + j + "Name", "defaultValue": ""}));
		attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + eaPrefix + j + "Value", "defaultValue": ""}));
		attrProperties.push(new Properties({"name": ipamPrefix + intPrefix + i + eaPrefix + j + "Comparison", "defaultValue": ""}));
	}*/
}

if (enableCustomHostname && autodetectCustomHostname) {
	if (useDefaultConditionalProperties) {
		attrProperties.push(new Properties({"name": getCustomHostnameCondition(0, "Name"), "defaultValue": "Custom.SetCustomHostname.Execute"}));
		attrProperties.push(new Properties({"name": getCustomHostnameCondition(0, "Value"), "defaultValue": "true"}));
	} else {
		for (i = 0; i < conditionalPropertiesNumber; i++) {
			attrProperties.push(new Properties({"name": getCustomHostnameCondition(i, "Name"), "defaultValue": condPropNameArray[i]}));
			attrProperties.push(new Properties({"name": getCustomHostnameCondition(i, "Value"), "defaultValue": condPropValueArray[i]}));
		}
	}
}

function getFullName(index, name) {
	return "Infoblox.IPAM.Network" + index + "." + name;
}

function getCustomHostnameCondition(condIndex, propName) {
	return "Infoblox.IPAM.CustomHostname.ConditionalMachineCustomProperty" + condIndex + "." + propName;
}

function getDnsViewValue(index) {
	if (createHostRecord && enableDnsArray[index] || createDnsRecord) {
		return dnsViewArray[index];
	} else {
		return "";
	}
}

function getAliaseValue(index) {
	if (createHostRecord && enableDnsArray[index] || createDnsRecord) {
		var aliases = aliasesArray[index];
		return aliases != null && aliases != undefined && aliases.length > 0 ? aliases.join(",") : "";
	} else {
		return "";
	}
}

function getEnableDnsValue(index) {
	if (createHostRecord) {
		return enableDnsArray[index] ? "TRUE" : "FALSE";
	} else {
		return "FALSE";
	}
}


function getEnableDhcpValue(index) {
	if (createHostRecord) {
		return enableDhcpArray[index] ? "TRUE" : "FALSE";
	} else {
		return "FALSE";
	}
}

function getMsDhcpServerValue(index) {
	if (createDhcpRecord) {
		return msDhcpServerArray[index];
	} else {
		return "";
	}
}

