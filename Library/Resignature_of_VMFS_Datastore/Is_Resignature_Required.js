/**
 * Is Resignature Required
 *
 * @param {VC:HostSystem} host
 * @param {Any} hostScsiDisk
 * @param {number} capacity
 * @param {Any} vmfsDatastoreOption
 * @param {string} datastoreName - [object Object]
 * @return {VC:Datastore} newDatastore
 * @return {string} extntDevicePath
 * @return {boolean} isResignatureRequired
 * @return {Any} hostDatastoreSystem
 */
hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );
var unresolvedVolumes =  hostDatastoreSystem.queryUnresolvedVmfsVolumes();
if(unresolvedVolumes == null){
	isResignatureRequired = false;
	System.debug("unresolvedVolumes is NULL! Resignature not required")
}
else{
System.log("Total Unresolved Vmfs Volumes found : "+unresolvedVolumes.length);

for(var i = 0; i < unresolvedVolumes.length; i++)
{
	for(var j = 0; j < unresolvedVolumes[i].extent.length; j++)
	{
		if(unresolvedVolumes[i].extent[j].devicePath.indexOf(hostScsiDisk.devicePath.toString()) >= 0 )
		{
			isResignatureRequired = true;
			extntDevicePath = unresolvedVolumes[i].extent[j].devicePath;
			System.debug("Resignature required")
			break;
		}
	}
}
}