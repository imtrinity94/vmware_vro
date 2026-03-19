/**
 * deleteVirtualVolumeSnapshots
 *
 * @param {StoreServ:Connection} connection
 * @param {Array/StoreServ:Volume} volumesToDelete
 */
for (var i = 0; i < volumesToDelete.length; i++)
{
	var snapVolumes = System.getModule("com.hpe.storeserv.snapshot").getSnapshotsByVolumeName(connection,volumesToDelete[i]);
	if ((snapVolumes != undefined) || (snapVolumes != null)) 
	{
		for (var j = 0; j < snapVolumes.length; j++)
		{
			var actionResult = System.getModule("com.hpe.storeserv.snapshot").deleteVolumeSnapshot(connection,snapVolumes[j]);
			if(!actionResult) {
				System.error("Unable to delete the Snapshot Volume: " + snapVolumes[j].name);
				throw "Unable to delete the Snapshot Volume: " + snapVolumes[j].name;
			}
			System.log("Deleted the Snapshot Volume: " + snapVolumes[j].name);
		}
	}
}