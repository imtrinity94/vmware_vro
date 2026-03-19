/**
 * This data object type defines the properties of an AMD Lance PCNet32 Ethernet card attached to a virtual machine.
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
actionResult = System.getModule("com.vmware.library.vc.vm.spec.config.device").getVirtualPCNet32(backing,connectable,controllerKey,deviceInfo,key,unitNumber,addressType,macAddress,wakeOnLanEnabled) ;