/**
 * Wait for the VMware tools to be up and the guest running

Exception:
- Timeout: When timeout is reached
- ReferenceError: When vm is not setted correctly
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {number} timeout - [object Object]
 * @param {number} pollingRate - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.vc.vm.tools").vim3WaitToolsStarted(vm,pollingRate,timeout) ;