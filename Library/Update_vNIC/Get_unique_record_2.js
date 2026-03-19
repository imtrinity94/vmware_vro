/**
 * Get unique record
 *
 * @param {Array/Any} attrFoundRecords
 * @return {Any} attrRecord
 */
if (attrFoundRecords.length == 0) {
	throw "Unable to update DNS records: no A records were found in IPAM.";
}

if (attrFoundRecords.length > 1) {
	throw "Unable to update DNS records: more than one A records were found in IPAM.";
}

attrRecord = attrFoundRecords[0];