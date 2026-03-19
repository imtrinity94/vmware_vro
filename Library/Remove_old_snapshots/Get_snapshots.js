/**
 * Get snapshots
 *
 * @param {number} numbrOfDay
 * @param {boolean} removeChildren
 * @param {Array/VC:VirtualMachineSnapshot} snapshots
 * @param {Properties} snapshotProperties
 * @return {Array/VC:VirtualMachineSnapshot} snapshots
 */
snapshots = new Array();

var searchResults = System.getModule("com.vmware.library.vc.vm.snapshot").getAllSnapshotResultInDatastoreBrowser(false,false,false,true) ;

var instance = new VcManagedObjectReference();
instance.type = "ServiceInstance";
instance.value = "ServiceInstance";
var instanceObject = null;
var dateNow;
var timeForDateNow;
var timeForDateModif;
var diff;
var days;

var ss;
var folderPath;
for (var i in searchResults) {
	var files = searchResults[i].file;
	for (var j in files) {
        folderPath = searchResults[i].folderPath;
        folderPath = folderPath.charAt(folderPath.length - 1) === '/' ? folderPath : folderPath + '/';
		ss = snapshotProperties.get(folderPath + files[j].path);
		if(ss){
			if(instanceObject==null){
				instanceObject = VcPlugin.convertToVimManagedObject(ss , instance);
			}
			dateNow = instanceObject.currentTime();
			timeForDateNow = dateNow.getTime();
			timeForDateModif = files[j].modification.getTime();
			diff = timeForDateNow-timeForDateModif;
			days = diff/86400000;

			if(days>numbrOfDay){
				snapshots.push(ss);
				System.log("The snapshot "+searchResults[i].folderPath +files[j].path+" of the VM "+ss.config.name+" had "+Math.floor(days)+" days");
				snapshotProperties.remove(folderPath + files[j].path);
			}		
		}			
	}
}
	


