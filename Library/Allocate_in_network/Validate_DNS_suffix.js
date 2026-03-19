/**
 * Validate DNS suffix
 *
 * @param {boolean} createHostRecord
 * @param {boolean} createAddressRecord
 * @param {boolean} createAddressAndPtrRecords
 * @param {boolean} enableDns
 * @param {string} attrDnsSuffix
 * @param {string} dnsSuffixOverride
 * @return {string} attrDnsSuffix
 */
var isDnsRecord = (createHostRecord && enableDns) || createAddressRecord || createAddressAndPtrRecords;

System.log("Default DNS Suffix: " + attrDnsSuffix);
System.log("Requested DNS Suffix Override: " + dnsSuffixOverride);
if(dnsSuffixOverride){
	attrDnsSuffix = dnsSuffixOverride
}

if (isDnsRecord && ! attrDnsSuffix) {
	throw "Error allocating IP address(es) because unable to generate hostname: DNS suffix is undefined, code: 1006";
}
