/**
 * Identify latest snapshot of each volume
 *
 * @param {PS:FlashArrayConnection} targetFAConnection
 * @param {Array/PS:ProtectionGroup} targetPGs
 * @param {Array/PS:Volume} faVolumes
 * @return {Array/PS:Snapshot} latestSnaps
 */
//Get all snapshots from target connection
var allTargetSnapshots = System.getModule("com.purestorage.flasharray.snapshot").getAllSnapshots(targetFAConnection) ; 
var latestSnaps = new Array();

for(var volIndex = 0; volIndex < faVolumes.length; volIndex++){
	var snapsForVol = new Array();
	var i = 0;
	var vol_FAConnection= PSVolumeManager.getFAConnectionForVolume(faVolumes[volIndex]);
	var localFA_Object = PSFlashArrayManager.getFlashArray(vol_FAConnection); // Get FA of Volume
	
	for(var allSnapIndex = 0; allSnapIndex < allTargetSnapshots.length; allSnapIndex++){
		var sourceNameinTargetFASnap = localFA_Object.name +":"+ faVolumes[volIndex].name;
		if(allTargetSnapshots[allSnapIndex].source == sourceNameinTargetFASnap){
			var validSnap = validateSnapshotWithPGs(allTargetSnapshots[allSnapIndex], targetPGs);
			if(validSnap){
				snapsForVol[i++] = allTargetSnapshots[allSnapIndex];				
			}
		}
	}
	latestSnaps[volIndex] = snapsForVol[i-1];  // last snapshot in the list will be the latest.
}

//-------------------------------------------------------------------
function validateSnapshotWithPGs(snapshot, PGs){
	for(var pgIndex = 0; pgIndex < PGs.length; pgIndex++){
		if(snapshot.name.indexOf(PGs[pgIndex].name)>-1){
			return true;
		}
	}
	return false;
}