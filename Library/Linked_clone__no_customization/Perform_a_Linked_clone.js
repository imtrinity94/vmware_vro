/**
 * Perform a Linked clone
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:VmFolder} folder
 * @param {string} name
 * @param {VC:HostSystem} host
 * @param {VC:Datastore} datastore
 * @param {VC:ResourcePool} pool
 * @param {VC:VirtualMachineSnapshot} snapshot
 * @param {boolean} powerOn
 * @param {number} pollRate
 * @param {boolean} progress
 * @param {number} numberOfLinkedClones
 * @return {Array/VC:Task} taskArray
 */
var  devices = vm.config.hardware.device; 
var myDisks = new Array();
for (var i = 0; i< devices.length; i++) {
	if ( devices[i] instanceof VcVirtualDisk ) {
		myDisks.push(devices[i]);
	}
}
var myVcVirtualMachineRelocateSpecDiskLocators = new Array(); 
for (var i = 0; i< myDisks.length; i++) {
	var myVcVirtualMachineRelocateSpecDiskLocator = new VcVirtualMachineRelocateSpecDiskLocator();
	myVcVirtualMachineRelocateSpecDiskLocator.datastore = datastore.reference;
	myVcVirtualMachineRelocateSpecDiskLocator.diskId = myDisks[i].key; 
	myVcVirtualMachineRelocateSpecDiskLocator.diskMoveType = "createNewChildDiskBacking";
	myVcVirtualMachineRelocateSpecDiskLocators.push(myVcVirtualMachineRelocateSpecDiskLocator);
}

var relocateSpec = System.getModule("com.vmware.library.vc.vm.spec").getRelocateSpec(datastore,myVcVirtualMachineRelocateSpecDiskLocators,host,pool,null);
var cloneSpec = System.getModule("com.vmware.library.vc.vm.spec").getCloneSpec(null,null,relocateSpec,powerOn,vm);
cloneSpec.snapshot = snapshot.reference; 

taskArray = new Array();

for (var i=0; i<numberOfLinkedClones ;i++){
	var linkedCloneName = name + "-"+i; 
	var task = System.getModule("com.vmware.library.vc.vm").cloneVM(vm,folder,linkedCloneName,cloneSpec);
	taskArray.push(task);
}
