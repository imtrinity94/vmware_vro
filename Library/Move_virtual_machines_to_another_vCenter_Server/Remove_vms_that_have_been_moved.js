/**
 * Remove vms that have been moved
 *
 * @param {Array/VC:VirtualMachine} vms
 */
System.log("In the first VC, remove the VMs that have been moved");

for (i in vms){
	var task = System.getModule("com.vmware.library.vc.vm").destroyVm(vm) ;
	var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;
}