/**
 * Get unique record
 *
 * @param {Array/Any} attrFoundRecords
 * @return {Any} attrRecord
 */
if (attrFoundRecords.length == 0) {
	throw "Unable to update fixed address: no fixed addresses were found in IPAM.";
}

if (attrFoundRecords.length > 1) {
	throw "Unable to update fixed address: more than one fixed addresses were found in IPAM.";
}

attrRecord = attrFoundRecords[0];