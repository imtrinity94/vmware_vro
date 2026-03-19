/**
 * validateVolumeSize
 *
 * @param {PS:Volume} volumeObj - [object Object]
 * @param {string} volSize
 */
var currentCap = volumeObj.size;
var size=volSize;
System.log("The current capacity in bytes is " + currentCap); // displayed on UI
if (size.match( /(KB|kb)/ ) )
{
	var sizeInKB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInKB * 1024);
	System.log("The new capacity in bytes will be " + sizeInBytes);
}
else if (size.match( /(MB|mb)/ ) )
{
	var sizeInMB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInMB * 1024 * 1024);
	System.log("The new capacity in bytes will be " + sizeInBytes);
}
else if (size.match( /(GB|gb)/ ) )
{
	var sizeInGB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInGB * 1024 * 1024 * 1024);
	System.log("The new capacity in bytes will be " + sizeInBytes);
} 
else if (size.match( /(TB|tb)/ ) )
{
	var sizeInTB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInTB * 1024 * 1024 * 1024 * 1024);
	System.log("The new capacity in bytes will be " + sizeInBytes);
} 
else if (size.match( /(PB|pb)/ ) )
{
	var sizeInPB = size.substring(0, size.length-2);
	var sizeInBytes = (sizeInPB * 1024 * 1024 * 1024 * 1024 * 1024);
	System.log("The new capacity in bytes will be " + sizeInBytes);
}
else
{
	var sizeInBytes = size;
	System.log("The new capacity in bytes will be " + sizeInBytes);
} 
if (sizeInBytes <= currentCap)
{
		var hostError = ("The entered new capacity must be larger than the current volume capacity. Failing operation..."); 
		System.error(hostError);
		throw (hostError);
}
else if (sizeInBytes > currentCap)
{
		System.log("The new capacity is larger than the current capacity and therefore valid"); 
}
else 
{
		var hostError = ("Invalid size entry. Check input. Should be an integer, or an integer followed by KB,MB,GB,TB, or PB"); 
		System.error(hostError);
		throw (hostError);
}