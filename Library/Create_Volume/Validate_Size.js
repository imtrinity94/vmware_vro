/**
 * sizeInNumber + Unit
 *
 * @param {number} sizeInNumber - [object Object]
 * @param {string} unitForSize - [object Object]
 * @return {string} size
 */
var units = System.getModule("com.purestorage.flasharray.volume").getUnitsForSize() ;

if(units.indexOf(unitForSize) == -1)
{
	throw "Please provide valid unit for volume size."
}

size = sizeInNumber + unitForSize;
System.debug("size: "+size);