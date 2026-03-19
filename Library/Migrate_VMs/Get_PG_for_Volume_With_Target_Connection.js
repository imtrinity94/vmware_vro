/**
 * Get PG for Volume With Target Connection
 *
 * @param {PS:FlashArrayConnection} targetFAConnection
 * @param {Array/PS:Volume} faVolumes
 * @return {Array/PS:ProtectionGroup} volumePgList
 */
var pgList = new Array();
for(var i = 0; i < faVolumes.length; i++){
	//Get the Protection Group protecting the FA volume with given targetFA as target array. 
	var pg = System.getModule("com.purestorage.flasharray.protectiongroup").getPGForVolumeWithTargetFAConnection(faVolumes[i],targetFAConnection);
	if(!pg){
		var errorMessage = "No Protection Group found for volume: " + faVolumes[i].name;
		throw errorMessage;
	}
	else{
		if(pgList.length==0){
			pgList.push(pg);
		}
		// Filtered the unique Protectin Groups 
		else{
			var isPGPresent =false;
			var pgConnection = System.getModule("com.purestorage.flasharray.protectiongroup").getFAConnectionByProtectionGroup(pg);	
			for(var j=0; j < pgList.length; j++){
				if(pgList[j].name.indexOf(pg.name)!=-1){
					var volPgConn = System.getModule("com.purestorage.flasharray.protectiongroup").getFAConnectionByProtectionGroup(pgList[j]);
					if(pgConnection.name.indexOf(volPgConn.name)!=-1){
						isPGPresent = true;
						break;
					}
				}
			}
			if(!isPGPresent){
				pgList.push(pg);
			}
		}
	}
}
System.log("Protection group list for volumes hosting VMs listed successfully.");
volumePgList = pgList;