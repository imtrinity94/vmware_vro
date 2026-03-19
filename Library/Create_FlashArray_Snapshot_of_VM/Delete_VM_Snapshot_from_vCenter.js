/**
 * Delete VM Snapshot from vCenter
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {VC:VirtualMachineSnapshot} snapshot1 - [object Object]
 */
System.debug("vCenter Side Snapshot : "+ snapshot1.name);
var task = snapshot1.removeSnapshot_Task(false);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;