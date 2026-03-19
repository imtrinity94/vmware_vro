/**
 * Get unique record
 *
 * @param {Array/Any} attrFoundRecords
 * @return {Any} attrRecord
 */
if (attrFoundRecords.length == 0) {
	throw "Unable to update host record: no host records were found in IPAM.";
}

if (attrFoundRecords.length > 1) {
	throw "Unable to update host record: more than one host records were found in IPAM.";
}

attrRecord = attrFoundRecords[0];
