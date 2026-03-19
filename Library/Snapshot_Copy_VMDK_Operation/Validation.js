/**
 * Validation
 *
 * @param {StoreServ:ProtectionSnapshot} snapshot
 * @param {StoreServ:ProtectionConnection} connection
 * @return {string} sourceDatastore
 */
if((snapshot.mountStatus != undefined) && (snapshot.mountStatus === "attached"))
{
	var snapshotFullDetails = System.getModule("com.hpe.rmc.snapshot").getSnapshotFullDetails(connection,snapshot);
	if((snapshotFullDetails != undefined) && (snapshotFullDetails.esxHostName != undefined) 
		&& (snapshotFullDetails.esxHostName.length > 0) && (snapshotFullDetails.virtualCopyDatastoreName != null)
		&& (snapshotFullDetails.virtualCopyDatastoreName.length > 0)) {
		sourceDatastore=snapshotFullDetails.virtualCopyDatastoreName[0];
		var hostESXSystem=snapshotFullDetails.esxHostName[0];
		if(sourceDatastore != undefined) {
			System.log("Selected snapshot '"+  snapshot.name +"' is mounted to ESX host '"+  hostESXSystem + "' as datastore '" +  sourceDatastore +"'");
		}else {
			System.error("Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!");
			throw "Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!";
		}
	}else {
		System.error("Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!");
		throw "Unable to retrieve selected snapshot '"+  snapshot.name +"' full details!";	
	}

} else {	
	System.error("Selected snapshot '"+  snapshot.name +"' is not mounted!");
	throw "Selected snapshot '"+  snapshot.name +"' is not mounted!";	
}