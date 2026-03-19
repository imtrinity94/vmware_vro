/**
 * The ConfigSpec data object type encapsulates configuration settings when creating or reconfiguring a virtual machine. To support incremental changes, these properties are all optional.
Basic Version
 *
 * @param {Array/Any} deviceChange - [object Object]
 * @param {Any} files - [object Object]
 * @param {Any} flags - [object Object]
 * @param {number} memoryMB - [object Object]
 * @param {string} name - [object Object]
 * @param {number} numCPUs - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec").getConfigSpecSimple(deviceChange,files,flags,memoryMB,name,numCPUs) ;