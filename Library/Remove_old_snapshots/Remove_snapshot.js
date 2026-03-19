/**
 * Remove snapshot
 *
 * @param {VC:VirtualMachineSnapshot} activeSnapshot
 * @param {boolean} removeChildren
 * @param {string} content
 * @return {string} content
 */
var logtext;
if(activeSnapshot.config){
	var vmName = activeSnapshot.config.name;
	var snapshotID = activeSnapshot.id;

	var task = activeSnapshot.removeSnapshot_Task(removeChildren);
	var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task) ;

	logtext = "The snapshot with the id " + snapshotID + " from the Virtual machine '"+vmName+"'has been removed.";
}else{
	logtext = "The snapshot with the id " + activeSnapshot.id + " has already been removed.";
}

content = content + "<br>" + logtext;
System.log(logtext);




