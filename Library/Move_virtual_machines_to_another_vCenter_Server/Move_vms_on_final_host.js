/**
 * Move vms on final host
 *
 * @param {Array/string} vmsUUID
 * @param {Array/VC:VirtualMachine} vms
 * @param {VC:HostSystem} hostInSecondVC
 * @param {VC:ResourcePool} resourcePoolInSecondVC
 */
System.log("Now the esx is in another VC");
System.log("Move vms on the esx which is on the second vc");
//search the vm by the uuid and move it

var rootFolder = hostInSecondVC.rootFolder;
var datacenters = new Array();
datacenters = searchInFolder(rootFolder,datacenters);
for(var j in datacenters){
	for(var k in vmsUUID){
		var uuid = vmsUUID[k];
		var vm = hostInSecondVC.searchIndex.findByUuid(datacenters[j].reference,uuid,true); 
		if(newVm!=null){
			var task = vm.migrateVM_Task(resourcePoolInSecondVC, hostInSecondVC, VcVirtualMachineMovePriority.defaultPriority, null);
			var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;
		}
	}
}