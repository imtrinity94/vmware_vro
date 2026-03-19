/**
 * The VirtualDeviceSpec data object type encapsulates change specifications for an individual virtual device. The virtual device being added or modified must be fully specified.
 *
 * @param {VC:VirtualDeviceConfigSpecOperation} operation - [object Object]
 * @param {VC:VirtualDeviceConfigSpecFileOperation} fileOperation - [object Object]
 * @param {Any} device - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.config").getVirtualDeviceConfigSpec(device,fileOperation,operation) ;