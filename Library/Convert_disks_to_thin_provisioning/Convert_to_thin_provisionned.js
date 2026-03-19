/**
 * Convert to thin provisionned
 *
 * @param {VC:Datastore} datastoreTarget
 * @param {VC:VirtualMachine} activeVM
 * @param {VC:Datastore} datastore
 */
var vm = activeVM;
//Migrate in the temporary datastore to convert the disk
var relocateSpec = new VcVirtualMachineRelocateSpec();
relocateSpec.datastore = datastoreTarget.reference;
relocateSpec.transform = VcVirtualMachineRelocateTransformation.sparse;	
var task = vm.relocateVM_Task(relocateSpec);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;
	
//Migrate back in the datastore where it was first
var relocateSpec2 = new VcVirtualMachineRelocateSpec();
relocateSpec2.datastore = datastore.reference;
relocateSpec2.transform = VcVirtualMachineRelocateTransformation.sparse;	
var task2 = vm.relocateVM_Task(relocateSpec2);
var actionResult2 = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task2) ;
	
System.log("The virtual machine has now all its disk in thin provisioned mode.");




