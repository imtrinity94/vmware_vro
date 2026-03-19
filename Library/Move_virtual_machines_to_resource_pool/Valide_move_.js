/**
 * Valide move?
 *
 * @param {Array/VC:VirtualMachine} vms
 * @param {VC:ResourcePool} resourcePool
 */
rpParent = resourcePool.parent;
while (rpParent != null &&  
	System.getObjectClassName(rpParent) != "VcClusterComputeResource" &&  
	System.getObjectClassName(rpParent) != "VcComputeResource") {
	rpParent = rpParent.parent;	
	System.debug("rpParent:" + (rpParent == null ? "null" : rpParent.name));
}

// foreach vm
for each (var vm in vms) {
	var vmParent = vm.resourcePool;
	System.debug(vmParent);
	while (vmParent != null &&  
		System.getObjectClassName(vmParent) != "VcClusterComputeResource" &&  
		System.getObjectClassName(vmParent) != "VcComputeResource") {
		vmParent = vmParent.parent;	
	}	
	System.debug("vmParent:" + (vmParent == null ? "null" : vmParent.name));
	if (vmParent != rpParent) {
		System.error("Unable to move to a resource pool from another Cluster / Standalone host");
		Server.error("Unable to move to a resource pool from another Cluster / Standalone host");
		throw "ReferenceError: Unable to move to a resource pool from another Cluster / Standalone host";
		break;
	}
}