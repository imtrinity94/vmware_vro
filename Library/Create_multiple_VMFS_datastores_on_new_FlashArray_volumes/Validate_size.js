/**
 * Validate size
 *
 * @param {number} volSize - [object Object]
 * @param {string} volUnit - [object Object]
 */
var size=volSize+volUnit;

if (size.match( /(KB|kb)/ ) )
{
	var sizeInKB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInKB * 1024);
	System.debug("The new capacity in bytes will be " + sizeInBytes);
}
else if (size.match( /(MB|mb)/ ) )
{
	var sizeInMB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInMB * 1024 * 1024);
	System.debug("The new capacity in bytes will be " + sizeInBytes);
}
else if (size.match( /(GB|gb)/ ) )
{
	var sizeInGB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInGB * 1024 * 1024 * 1024);
	System.debug("The new capacity in bytes will be " + sizeInBytes);
} 
else if (size.match( /(TB|tb)/ ) )
{
	var sizeInTB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInTB * 1024 * 1024 * 1024 * 1024);
	System.debug("The new capacity in bytes will be " + sizeInBytes);
} 
else if (size.match( /(PB|pb)/ ) )
{
	var sizeInPB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInPB * 1024 * 1024 * 1024 * 1024 * 1024);
	System.debug("The new capacity in bytes will be " + sizeInBytes);
}
else
{
	var sizeInBytes = size;
	System.debug("The new capacity in bytes will be " + sizeInBytes);
} 

var minSizeInBytes = (1.3 * 1024 * 1024 * 1024);
System.debug("The minimum size for datastore in bytes: " + minSizeInBytes);

if (sizeInBytes < minSizeInBytes)
{
		var hostError = ("The given size is less than the required minimum size of a VMFS datastore. The required minimum size for a VMFS datastore is 1.3GB, however, the recommended minimum size is 2GB."); 
		System.error(hostError);
		throw (hostError);
}
else if (sizeInBytes >= minSizeInBytes)
{
		System.log("The new capacity is larger than the required minimum size for a VMFS datastore and therefore valid"); 
}
else 
{
		var hostError = ("Invalid size entry. Check input. Should be an integer, or an integer followed by KB,MB,GB,TB, or PB"); 
		System.error(hostError);
		throw (hostError);
}