/**
 * Delete VM Snapshot
 *
 * @param {VC:VirtualMachineSnapshot} snapshot1
 */
var task = snapshot1.removeSnapshot_Task(false);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;
System.log("Snapshot deleted Successfully");