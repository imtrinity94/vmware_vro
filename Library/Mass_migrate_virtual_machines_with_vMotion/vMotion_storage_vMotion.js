/**
 * vMotion/storage vMotion
 *
 * @param {string} transform
 * @param {VC:ResourcePool} pool
 * @param {VC:HostSystem} host
 * @param {VC:Datastore} datastore
 * @param {boolean} allVMs
 * @param {Array/VC:VirtualMachine} vms
 * @param {Any} relocateSpec
 * @param {boolean} progress
 * @param {number} pollRate
 */
var vmsToRelocate = new Array();
if(allVMs){
	vmsToRelocate = VcPlugin.getAllVirtualMachines();
}else{
	if (vms == null || vms.length == 0) {
		throw "At least one vm must be specified";
	}
	vmsToRelocate = vms;
}

for(var i in vmsToRelocate){
	var vm = vmsToRelocate[i];
	task = vm.relocateVM_Task(relocateSpec);
	try {
		var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate);
		System.log("vMotion/storage vMotion performed for VM : " + vm.name);
		Server.log("vMotion/storage vMotion performed for VM : " + vm.name);
	}
	catch (e) {
		System.error("vMotion/storage vMotion failed for VM : " + vm.name + ". Reason: " + e);
		Server.error("vMotion/storage vMotion failed for VM : " + vm.name + ". Reason: " + e);
	}
}