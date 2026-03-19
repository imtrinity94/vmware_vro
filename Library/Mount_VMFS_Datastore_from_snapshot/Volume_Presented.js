/**
 * Volume Presented
 *
 * @param {Properties} actionResult1
 * @param {StoreServ:Snapshot} snapshot
 * @param {StoreServ:Connection} connection
 * @return {boolean} isVolumePresented
 * @return {number} lun
 * @return {StoreServ:Volume} volume
 */
if (actionResult1)
{

	isVolumePresented = true;
	var prop = 	actionResult1;
	if(prop) {
		lun = prop.get("lun");
		var volName = prop.get("volumeName");
		volume = System.getModule("com.hpe.storeserv.volume").getVolumeByName(connection,snapshot.name);
		System.log("Volume Name: " + volName  +  " LUN: " + lun);
	}
	
} 
