/**
 * Register VM
 *
 * @param {Array/VC:VmFolder} sourceFolders
 * @param {Array/string} sourceVMPaths
 * @param {Array/VC:ResourcePool} sourceResPool
 * @param {Array/VC:HostSystem} sourcehosts
 * @param {Array/string} sourceNames
 * @param {boolean} asTemplate
 * @param {boolean} progress
 * @param {number} pollRate
 * @return {Array/VC:VirtualMachine} sourceVMRegistered
 */
for(var i = 0 ; i < sourceNames.length ; i++){
System.debug("Values: sourceVMPaths , sourceResPool, sourcehosts, sourceNames, sourceFolders : " +sourceVMPaths[i] + "  " + sourceResPool[i] + "  "  + sourcehosts[i] + "  "  + sourceNames[i]+ "  " + sourceFolders[i]);
var task = sourceFolders[i].registerVM_Task(sourceVMPaths[i], sourceNames[i], asTemplate, sourceResPool[i], sourcehosts[i]);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;
}
