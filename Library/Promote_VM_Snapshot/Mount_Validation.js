/**
 * Mount Validation
 *
 * @param {StoreServ:ProtectionSnapshot} snapshot
 * @param {StoreServ:ProtectionConnection} connection
 */
if((snapshot.mountStatus != undefined) && (snapshot.mountStatus === "attached"))
{	
	var snapshotFullDetails = System.getModule("com.hpe.rmc.snapshot").getSnapshotFullDetails(connection,snapshot);
	if((snapshotFullDetails != undefined) && (snapshotFullDetails.esxHostName != undefined) 
		&& (snapshotFullDetails.esxHostName.length > 0) && (snapshotFullDetails.virtualCopyDatastoreName != null)
		&& (snapshotFullDetails.virtualCopyDatastoreName.length > 0)) {
		var hostESXSystem=snapshotFullDetails.esxHostName[0];
		if(hostESXSystem != undefined) {
			System.log("Selected snapshot '"+  snapshot.name +"' is already mounted to ESX host '"+  hostESXSystem + "' as datastore '"+  snapshotFullDetails.virtualCopyDatastoreName[0] +"'. Please unmount, if it needs to be mounted to different ESX host");
			throw "Selected snapshot '"+  snapshot.name +"' is already mounted to ESX host '"+  hostESXSystem + "' as datastore '"+  snapshotFullDetails.virtualCopyDatastoreName[0] +"'. Please unmount, if it needs to be mounted to different ESX host";
		}else {
			System.error("Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!");
			throw "Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!";
		}
	}else {
		System.error("Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!");
		throw "Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!";	
	}
} 