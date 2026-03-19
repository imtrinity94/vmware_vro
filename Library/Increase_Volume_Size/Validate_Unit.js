/**
 * Validate Unit
 *
 * @param {number} sizeInNumber - [object Object]
 * @param {string} unitForSize - [object Object]
 * @return {string} volSize
 */
var units = System.getModule("com.purestorage.flasharray.volume").getUnitsForSize() ;

if(units.indexOf(unitForSize) == -1)
{
	throw "Please provide valid unit for volume size."
}

volSize = sizeInNumber + unitForSize;
System.debug("size: "+volSize);