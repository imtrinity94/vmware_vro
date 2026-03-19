/**
 * Check data for removing
 *
 * @param {string} hostName
 * @param {string} dnsView
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @return {boolean} attrIsAddressRecordExists
 * @return {boolean} attrIsPTRRecordExists
 * @return {boolean} attrIsCnameRecordExists
 */
var dnsManager = attrIpamConnection.getDnsRecordManager();
var hostNameInLowerCase = hostName.toLowerCase();

attrIsAddressRecordExists = dnsManager.isAddressRecordExists(hostNameInLowerCase, dnsView);
attrIsPTRRecordExists = dnsManager.isPtrRecordExists(hostNameInLowerCase, dnsView);
var cnameRecords = dnsManager.findCnameRecordsByCanonicalName(hostNameInLowerCase, dnsView);
attrIsCnameRecordExists = cnameRecords && cnameRecords.length > 0;

if (!attrIsAddressRecordExists && !attrIsPTRRecordExists && !attrIsCnameRecordExists) {
	var dnsViewTemplate = dnsView ? "DNS view [" + dnsView + "]" : "default DNS view";
	var errorMessage = "No records were found by specified host name [" + hostNameInLowerCase + "] in " + dnsViewTemplate + ".";
	throw errorMessage;
}