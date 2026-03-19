/**
 * Get unique record
 *
 * @param {Array/Any} attrFoundRecords
 * @return {Any} attrRecord
 */
if (attrFoundRecords.length > 1) {
	throw "Unable to update reservation record in on-demand NAT network: more than one reservation records were found in IPAM.";
}

attrRecord = attrFoundRecords[0];
