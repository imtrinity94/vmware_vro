/**
 * Storage vMotion
 *
 * @param {string} transform
 * @param {VC:ResourcePool} pool
 * @param {VC:HostSystem} host
 * @param {VC:Datastore} datastore
 * @param {boolean} allVMs
 * @param {Array/VC:VirtualMachine} vms
 * @param {Any} relocateSpec
 * @param {VC:ClusterComputeResource} cluster
 * @param {VC:ComputeResource} computeResource
 * @param {VC:VmFolder} folder
 * @param {VC:HostSystem} hostSystem
 * @param {VC:ResourcePool} resourcePool
 * @param {VC:Datacenter} datacenter
 * @param {VC:VirtualMachineGuestOsIdentifier} os
 * @param {boolean} chooseAction
 * @param {Action} actionInput
 * @param {boolean} progress
 * @param {number} pollRate
 */
var vmsToRelocate = new Array();
if(allVMs){
	vmsToRelocate = VcPlugin.getAllVirtualMachines();
}else if(chooseAction){
	var actionResult;

	// Set the action input parameter
	var param = null;
	if (hostSystem != null) {
		param = hostSystem;
	}
	if (folder != null) {
		param = folder;
	}
	if (resourcePool != null) {
		param = resourcePool;
	}
	if (cluster != null) {
		param = cluster;
	}
	if (computeResource != null) {
		param = computeResource;
	}
	if (datacenter != null) {
		param = datacenter;
	}
	if (os != null) {
		param = os;
	}
	// Run the selected action with the chosen input parameter (if any)
	var methodCall = "System.getModule(\"" + actionInput.module.name + "\")." + actionInput.name + "( param )";
	vmsToRelocate = eval( methodCall );
}else{
	if (vms == null || vms.length == 0) {
		throw "At least one vm must be specified";
	}
	vmsToRelocate = vms;
}

for(var i in vmsToRelocate){
	var vm = vmsToRelocate[i];
	task = vm.relocateVM_Task(relocateSpec);
	var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;
	System.log("Storage vMotion performed for VM : " + vm.name);

}