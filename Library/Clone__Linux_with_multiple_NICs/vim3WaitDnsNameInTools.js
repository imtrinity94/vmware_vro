/**
 * Wait for a given name in the DNS guest informations (VMware tools).

Exception:
- Timeout: When timeout is reached
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {number} pollingRate - [object Object]
 * @param {string} dnsNameToWait - [object Object]
 * @param {number} timeout - [object Object]
 * @param {boolean} addNumberToName - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.vc.vm.tools").vim3WaitDnsNameInTools(vm,pollingRate,dnsNameToWait,timeout,addNumberToName) ;