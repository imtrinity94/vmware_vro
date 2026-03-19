/**
 * Validate
 *
 * @param {string} startAddress
 * @param {string} endAddress
 * @param {number} networkCidr
 * @param {string} ipVersion
 * @param {string} gateway
 */
var url = new URL();

if (!ipVersion) {
	throw "IP version is not specified.";
} else if(ipVersion != "IPv4")  {
	throw "Unsupported IP version: " + ipVersion;
}

if (!startAddress) {
	throw "Start IP address is not initialized.";
} else if (!url.isValidIPv4Address(startAddress)) {
	throw "Invalid start IP address: " + startAddress;
}

if (!endAddress) {
	throw "End IP address is not initialized.";
} else if (!url.isValidIPv4Address(endAddress)) {
	throw "Invalid end IP address: " + endAddress;
}

if (!gateway) {
	throw "Gateway is not initialized.";
} else if (!url.isValidIPv4Address(gateway)) {
	throw "Invalid gateway: " + gateway;
}

if (isNaN(networkCidr) || networkCidr > 128) {
	throw "Invalid network CIDR index: " + networkCidr;
}
