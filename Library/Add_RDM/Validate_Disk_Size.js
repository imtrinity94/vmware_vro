/**
 * Validate Disk Size
 *
 * @param {number} rdmVolSize
 * @param {string} sizeUnit
 */
if(sizeUnit == "KB") {
	if (rdmVolSize < 1024) {
		System.error("Volume size is incorrect, should be greater than 1MB");
		throw("Volume size is incorrect, should be greater than 1MB");
	}
} else if(sizeUnit == "PB") {
	if (rdmVolSize > 4) {
		System.error("Volume size is incorrect, should not be greater than 4PB");
		throw("Volume size is incorrect, should not be greater than 4PB");
	}
}