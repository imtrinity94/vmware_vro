/**
 * Power On/Off Source VM
 *
 * @param {Array/VC:VirtualMachine} sourceVMRegistered
 * @param {Array/VC:HostSystem} sourcehosts
 * @param {Array/string} sourceStates
 */
System.log("Unregistered Source VMs registered back");
for(var i = 0; i < sourceStates.length ; i++){
if(sourceStates[i] == "poweredOn"){
	System.getModule("com.vmware.library.vc.vm.power").startVM(sourceVMRegistered[i],sourcehosts[i]) ;
}
}