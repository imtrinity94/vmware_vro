/**
 * The VirtualVmxnet data object type represents an instance of the Vmxnet virtual Ethernet adapter attached to a virtual machine.
 *
 * @param {Any} backing - [object Object]
 * @param {Any} connectable - [object Object]
 * @param {number} controllerKey - [object Object]
 * @param {Any} deviceInfo - [object Object]
 * @param {number} key - [object Object]
 * @param {number} unitNumber - [object Object]
 * @param {string} addressType - [object Object]
 * @param {string} macAddress - [object Object]
 * @param {boolean} wakeOnLanEnabled - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.config.device").getVirtualVmxnet2(backing,connectable,controllerKey,deviceInfo,key,unitNumber,addressType,macAddress,wakeOnLanEnabled) ;