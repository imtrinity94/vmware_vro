/**
 * getVirtualVolumeAndHostSetListFromExports
 *
 * @param {Array/Properties} vluns
 * @param {StoreServ:Connection} connection
 * @return {Array/StoreServ:Volume} volumes
 * @return {Array/number} luns
 * @return {Array/StoreServ:HostSet} hostsets
 * @return {Array/StoreServ:Volume} volumesToDelete
 */
hostsets = new Array();
volumes = new Array();
volumesToDelete = new Array();
luns = new Array();

if(!vluns) throw "Empty exports";

for (var i = 0; i < vluns.length; i++)
{
	System.log("Virtual Volume Name: " + vluns[i].volumeName);
	System.log("Host/HostSet Name: " + vluns[i].hostName);
	System.log("Lun ID: " + vluns[i].lun);
	
	if(vluns[i].hostName && vluns[i].hostName.toLowerCase().indexOf("set:") == 0)
	{
		var hostset = System.getModule("com.hpe.storeserv.hostset").querySpecificHostSet(connection,vluns[i].hostName.substring(4));		
		var volume = System.getModule("com.hpe.storeserv.volume").getVolumeByName(connection,vluns[i].volumeName);
		if(!hostset) {
			System.error("HostSet: "+ vluns[i].hostName + " not found in 3PAR StoreServ array");
			throw "HostSet: "+ vluns[i].hostName + " not found in 3PAR StoreServ array";
		}
	
		if(!volume) {
			System.error("Virtual Volume: "+ vluns[i].volumeName + " not found in 3PAR StoreServ array");
			throw "Virtual Volume: "+ vluns[i].volumeName + " not found in 3PAR StoreServ array";
		}
	
		
		volumes.push(volume);		
		hostsets.push(hostset);		
		luns.push(vluns[i].lun);		
		if(volumesToDelete) {
			var volFound = false;
			for (var k = 0; k < volumesToDelete.length; k++)
			{	
				if(volumesToDelete[k].name == volume.name) {
					volFound = true;
					break;
				}				
			}
			if(volFound == false) {
				volumesToDelete.push(volume);
			}			
		}	
	}
}

if(!volumes.length || !hostsets.length || !luns.length) {
	throw "Virtual Volume is not exported to a hostset";
}

