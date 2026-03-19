/**
 * Validation
 *
 * @param {StoreServ:ProtectionSnapshot} snapshot
 * @param {StoreServ:ProtectionConnection} connection
 * @return {string} hostSystem
 */
if((snapshot.mountStatus != undefined) && (snapshot.mountStatus === "attached"))
{
	var snapshotFullDetails = System.getModule("com.hpe.rmc.snapshot").getSnapshotFullDetails(connection,snapshot);
	if((snapshotFullDetails != undefined) && (snapshotFullDetails.esxHostName != undefined) && (snapshotFullDetails.esxHostName.length > 0)) {
		hostSystem=snapshotFullDetails.esxHostName[0];
		if(hostSystem != undefined) {
			System.log("Selected snapshot '"+  snapshot.name +"' is mounted to ESX host '"+  hostSystem + "'");
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
