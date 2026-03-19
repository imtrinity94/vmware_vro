/**
 * Check if resignature is required
 *
 * @param {VC:HostSystem} host
 * @param {Any} hostScsiDisk
 * @param {number} capacity
 * @param {Any} vmfsDatastoreOption
 * @return {VC:Datastore} newDatastore
 * @return {string} extntDevicePath
 * @return {boolean} isResignatureRequired
 * @return {Any} hostDatastoreSystem
 */
hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );
var unresolvedExtents =  hostDatastoreSystem.queryUnresolvedVmfsVolumes();
if(unresolvedExtents == null){
	isResignatureRequired = false;
	System.debug("Resignature is not required")
}
else{
System.log("Unresolved Vmfs extents found.");

for(var i = 0; i < unresolvedExtents.length; i++)
{
	for(var j = 0; j < unresolvedExtents[i].extent.length; j++)
	{
		if(unresolvedExtents[i].extent[j].devicePath.indexOf(hostScsiDisk.devicePath.toString()) >= 0 )
		{
			isResignatureRequired = true;
			extntDevicePath = unresolvedExtents[i].extent[j].devicePath;
			System.debug("Resignature required")
			break;
		}
	}
}
}