/**
 * Storage vMotion of VMDK to Primary Datastore
 *
 * @param {VC:Datastore} targetDatastore
 * @param {number} diskKey
 * @param {VC:VirtualMachine} targetVM - [object Object]
 * @param {boolean} progress
 * @param {number} pollRate
 * @return {boolean} addedVMDK
 */
if(diskKey)
{
	System.log("Storage vMotion of VMDK started to primary datastore.");
}

var relocateSpec = new VcVirtualMachineRelocateSpec();

var disk1 = new Array();  
var diskInfo = new VcVirtualMachineRelocateSpecDiskLocator();
    diskInfo.diskId =diskKey;  
    diskInfo.datastore = targetDatastore.reference;  
  	disk1.push(diskInfo);

relocateSpec.disk = disk1;
task = targetVM.relocateVM_Task(relocateSpec);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;

System.log("Successfully migrated VMDK file to target VM's primary Datastore");