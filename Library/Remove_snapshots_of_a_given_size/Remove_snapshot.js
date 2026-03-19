/**
 * Remove snapshot
 *
 * @param {VC:VirtualMachineSnapshot} activeSnapshot
 * @param {boolean} removeChildren
 * @param {string} content
 * @return {string} content
 */
var vmName = activeSnapshot.config.name;
var snapshotID = activeSnapshot.id;

var task = activeSnapshot.removeSnapshot_Task(removeChildren);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;

content = content + "<br>The snapshot with the id " + snapshotID + " from the Virtual machine '"+vmName+"'has been removed.";
System.log("The snapshot with the id " + snapshotID + " from the Virtual machine '"+vmName+"'has been removed.");




