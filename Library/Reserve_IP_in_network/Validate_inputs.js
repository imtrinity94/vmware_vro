/**
 * Validate inputs
 *
 * @param {string} hostName
 * @param {string} netaddr
 * @param {number} cidr
 * @param {string} macAddress
 * @param {boolean} enableDhcp
 * @param {boolean} createHostRecord
 * @param {boolean} createAddressRecord
 * @param {boolean} createAssociatedPtrRecord
 * @param {boolean} createFixedAddress
 * @param {boolean} createReservation
 * @param {Array/string} addressRecordAliases
 * @param {string} dnsView
 * @param {string} networkView
 * @param {InfobloxIPAM:IpamConnection} attrConnection
 * @param {boolean} enableDns
 */
if (!createHostRecord && !createAddressRecord && !createAssociatedPtrRecord && !createFixedAddress && !createReservation) {
	throw "At least one entity should be selected for creation";
}

if (createHostRecord && (createAddressRecord || createAssociatedPtrRecord || createFixedAddress || createReservation)) {
	throw "One more entity cannot be created, if host record creation selected";
}

if (createAssociatedPtrRecord && !createAddressRecord) {
	throw "Cannot create a PTR record without creating the address record";
}

if (createFixedAddress && createReservation) {
	throw "Cannot create fixed address and reservation simultaneously";
}

// Network address and CIDR validation
if (netaddr) {
	var validationError = System.getModule("com.infoblox.ipam.util").validateIPAddress(netaddr);
	if (validationError) {
		throw validationError;
	}
} else {
	throw "IP address of the network is not specified";
}

if (createReservation) {
	var isIPv4Address = System.getModule("com.infoblox.ipam.util").isIPv4Address(netaddr);
	if (!isIPv4Address) {
		throw "The reservation supports only IPv4 addresses";
	}
}

if (!cidr) {
	throw "CIDR of the network is not specified";
}

// MAC address validation
if (createHostRecord || createFixedAddress) {
	if (!macAddress) {
		if (createFixedAddress || (createHostRecord && enableDhcp)) {
			throw "MAC address or DUID is not specified";
		}
	} else {
		var validationError = System.getModule("com.infoblox.ipam.util").validateMacAddress(macAddress);
		if (validationError) {
			throw validationError;
		}
	}
}

// Host name validation
if (createHostRecord || createAddressRecord) {
	if (hostName) {
		var isValidHostName = System.getModule("com.infoblox.ipam.util").validateHostName(hostName);
		if (!isValidHostName) {
			throw "Host name is invalid";
		}
	} else {
		throw "Host name is not specified";
	}
}

if (createAddressRecord && addressRecordAliases) {
	for each (var alias in addressRecordAliases) {
		if (!alias) {
			throw "There is at least one not specified alias in the list of aliases for CNAME records";
		}
		if (!new URL().isValidHostname(alias)) {
			throw "Alias [" + alias + "] for the CNAME record is not valid";
		}
	}
}

// Consistency of network/DNS views validation
if ((createHostRecord && enableDns) || createAddressRecord) {
	System.getModule("com.infoblox.ipam.util").checkConsistencyOfViews(attrConnection,dnsView,networkView);
}
