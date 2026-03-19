/**
 * Get all hostset and volumes
 *
 * @param {Array/Properties} vluns
 * @param {StoreServ:Connection} connection
 * @return {Array/StoreServ:HostSet} hostsets
 * @return {Array/StoreServ:Volume} volumes
 * @return {Array/number} luns
 * @return {Array/string} portids
 */
hostsets = new Array();
volumes = new Array();
luns = new Array();
portids = new Array();

for (var i = 0; i < vluns.length; i++)
{
	System.log("Volume Name: " + vluns[i].volumeName);
	System.log("Host/HostSet Name: " + vluns[i].hostName);
	System.log("Lun ID: " + vluns[i].lun);
	
	if(vluns[i].hostName && vluns[i].hostName.toLowerCase().indexOf("set:") == 0)
	{
		var hostset = connection.getHostSetByName(vluns[i].hostName.substring(4));		
		var volume = connection.getVolumeByName(vluns[i].volumeName);
		if(!hostset) {
			System.error("HostSet: "+ vluns[i].hostName + " not found in StoreServ");
			throw "HostSet: "+ vluns[i].hostName + " not found in StoreServ";
		}
	
		if(!volume) {
			System.error("Volume: "+ vluns[i].volumeName + " not found in StoreServ");
			throw "Volume: "+ vluns[i].volumeName + " not found in StoreServ";
		}
	
		
		volumes.push(volume);		
		hostsets.push(hostset);		
		luns.push(vluns[i].lun);
		portids.push(vluns[i].port);	
	}
}

if(!volumes.length || !hostsets.length || !luns.length) {
	throw "Volume is not present to a hostset";
}

