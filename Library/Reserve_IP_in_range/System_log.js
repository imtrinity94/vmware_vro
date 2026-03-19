/**
 * Log the input text to the console log with level 'log'
 *
 * @param {string} hostName
 * @param {string} dnsView
 */
var dnsViewValue = dnsView ? "[" + dnsView + "] DNS view" : "default DNS view"
System.log("The host record with name [" + hostName.toLowerCase() + "] alreary exists in "
	+ dnsViewValue	+ ". Additional host address will be added.");
