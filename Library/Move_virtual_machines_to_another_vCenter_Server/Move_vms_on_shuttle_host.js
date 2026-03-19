/**
 * Move vms on shuttle host
 *
 * @param {VC:HostSystem} host
 * @param {Array/VC:VirtualMachine} vms
 */
System.log("Put all the vm on the esx");

for(var i in vms){
	var vm = vms[i];
	var task = vm.migrateVM_Task(host.rootResourcePool, host, VcVirtualMachineMovePriority.defaultPriority, null);
	var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;
}

