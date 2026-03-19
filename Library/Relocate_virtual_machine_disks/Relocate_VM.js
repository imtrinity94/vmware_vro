/**
 * Relocate VM
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:VirtualMachineRelocateTransformation} transform
 * @param {VC:ResourcePool} pool
 * @param {VC:HostSystem} host
 * @param {VC:Datastore} datastore
 * @param {VC:VirtualMachineMovePriority} movePriority
 * @return {VC:Task} task
 */
var relocateSpec = new VcVirtualMachineRelocateSpec();
if (datastore != null)
	relocateSpec.datastore = datastore.reference;
relocateSpec.disk = null;
if (host != null)
	relocateSpec.host = host.reference;
if (pool != null) 
	relocateSpec.pool = pool.reference;
if (transform != null)
	relocateSpec.transform = VcVirtualMachineRelocateTransformation.fromString(transform.name);

// Commented because breaking VC 2.5 compatibility
//if (movePriority != null)
//	var priority = VcVirtualMachineMovePriority.fromString(movePriority.name);

task = vm.relocateVM_Task(relocateSpec); //, priority);