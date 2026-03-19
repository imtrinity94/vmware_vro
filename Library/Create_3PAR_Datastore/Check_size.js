/**
 * Check size
 *
 * @param {string} volUnit
 * @param {number} volSize
 * @return {number} volSizeMB
 */
var size=volSize+volUnit;
volSizeMB = 0;

if ((volSize == undefined || volSize == null) || (volUnit == undefined || volUnit == null))
{
	throw "Either Size or Unit is not provided";
}

if (size.match( /(MiB|MB)/ ) )
{
	var size_MB = size.substring(0, size.length-3);
	var size_Bytes = (size_MB * 1024 * 1024);
	volSizeMB = size_MB;
	System.debug("The provided capacity in bytes is " + size_Bytes);
}
else if (size.match( /(GiB|GB)/ ) )
{
	var size_GB = size.substring(0, size.length-3);
	var size_Bytes = (size_GB * 1024 * 1024 * 1024);
	volSizeMB = (size_GB * 1024);
	System.debug("The provided capacity in bytes is " + size_Bytes);
} 
else if (size.match( /(TiB|TB)/ ) )
{
	var size_TB = size.substring(0, size.length-3);
	var size_Bytes = (size_TB * 1024 * 1024 * 1024 * 1024);
	volSizeMB = (size_TB * 1024 * 1024);
	System.debug("The provided capacity in bytes is " + size_Bytes);
} 
else
{
	var size_Bytes = size;
	System.debug("The capacity in bytes is " + size_Bytes);
} 

var minSize_Bytes = (1.3 * 1024 * 1024 * 1024);
System.debug("The minimum size for datastore in bytes is: " + minSize_Bytes);

if (size_Bytes < minSize_Bytes)
{
		var sizeError = ("The provided size is less than the minimum size of a VMFS datastore. (1.3GB is the minimum size for a VMFS datastore), The recommended minimum size is 2GB."); 
		System.error(sizeError);
		throw (sizeError);
}
else if (size_Bytes >= minSize_Bytes)
{
		System.log("The provided size for a VMFS datastore is valid"); 
}
else 
{
		var sizeError = ("Invalid size provided"); 
		System.error(sizeError);
		throw (sizeError);
}