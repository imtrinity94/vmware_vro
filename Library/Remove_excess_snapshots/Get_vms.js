/**
 * Get vms
 *
 * @param {number} numberOfSnapshotMax
 * @param {Array/VC:VirtualMachine} vmWithLotSnapshots
 * @param {number} vmsLength
 * @return {Array/VC:VirtualMachine} vmWithLotSnapshots
 * @return {number} vmsLength
 */
vmWithLotSnapshots = new Array();
var vms = VcPlugin.getAllVirtualMachines();

for(i in vms){
	var vm = vms[i];
	if(vm.runtime.connectionState.value=="connected" && !vm.config.template){
		var actionResult = System.getModule("com.vmware.library.vc.vm.snapshot").getAllSnapshotsOfVM(vm);
		if(actionResult.length > numberOfSnapshotMax){
			vmWithLotSnapshots.push(vm);
			System.log("VM name : " + vm.name + " - Number of snapshots : " + actionResult.length);
		}
	}
}
vmsLength=vmWithLotSnapshots.length;