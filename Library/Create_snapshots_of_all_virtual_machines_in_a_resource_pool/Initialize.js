/**
 * Initialize
 *
 * @param {VC:ResourcePool} resourcePool
 * @param {boolean} childResourcePool
 * @return {Array/VC:VirtualMachine} allVMs
 * @return {number} vmCount
 * @return {number} currentVM
 */
// Retrieve an array of vms contained in the specified Resource Pool
if(childResourcePool){
	allVMs = System.getModule("com.vmware.library.vc.resourcePool").getAllVMsOfResourcePool(resourcePool) ;
}else{
	allVMs = resourcePool.vm;
}
vmCount = allVMs.length;
currentVM = 0;