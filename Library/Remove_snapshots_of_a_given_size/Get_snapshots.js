/**
 * Get snapshots
 *
 * @param {number} snapshotSize
 * @param {boolean} removeChildren
 * @param {Array/VC:VirtualMachineSnapshot} snapshots
 * @return {Array/VC:VirtualMachineSnapshot} snapshots
 */

snapshots = new Array();
var vms = VcPlugin.getAllVirtualMachines();

for(i in vms){
	var vm = vms[i];
	if(vm.runtime.connectionState.value=="connected" && !vm.config.template){
		var vmLayout = vm.layoutEx;
		if(vmLayout != null){
			var layoutFiles = {};
			for (f in vmLayout.file) {
				var file = vmLayout.file[f];
				layoutFiles[file.key] = file;
			}
			var layoutSnapshots = vmLayout.snapshot;
			for(s in layoutSnapshots){
				var totalSize = 0;
				var layoutSnapshot = layoutSnapshots[s];
				totalSize += layoutFiles[layoutSnapshot.dataKey].size;
				for (d in layoutSnapshot.disk) {
					var disk = layoutSnapshot.disk[d];
					var unit = disk.chain[disk.chain.length - 1];
					for (k in unit.fileKey) {
						totalSize += layoutFiles[unit.fileKey[k]].size;
					}
				}
				if(totalSize/1024/1024 > snapshotSize){
					var snapshot = VcPlugin.convertToVimManagedObject(vm, layoutSnapshot.key);
					snapshots.push(snapshot);
					System.log("Name : " + snapshot.name + " - Size : " + totalSize);
				}
			}
		}
	}
}
