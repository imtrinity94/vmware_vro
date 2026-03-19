/**
 * Log the input text to the console log with level 'log'
 *
 * @param {string} attrGateway
 * @param {string} attrDnsSuffix
 * @param {Array/string} attrDnsSearchSuffixes
 * @param {string} attrPrimaryDns
 * @param {string} attrSecondaryDns
 * @param {string} attrPrimaryWins
 * @param {string} attrSecondaryWins
 */
var text = "Got DHCP options: "
	+ "\n\tGateway: " + attrGateway
	+ "\n\tDNS suffix: " + attrDnsSuffix
	+ "\n\tDNS search suffixes: " + attrDnsSearchSuffixes
	+ "\n\tPrimary DNS: " + attrPrimaryDns
	+ "\n\tSecondary DNS: " + attrSecondaryDns
	+ "\n\tPrimary WINS: " + attrPrimaryWins
	+ "\n\tSecondary WINS: " + attrSecondaryWins;

System.log(text);
