/**
 * wait for tasks
 *
 * @param {Array/VC:Task} taskArray
 * @param {boolean} progress
 * @param {number} pollRate
 * @return {Array/VC:VirtualMachine} createdVms
 */
//Todo: Fill in array with successful tasks

var taskEndArray = new Array(taskArray.length);
var allFinished = false;
createdVms = new Array();

while (allFinished != true) {
	
	for (var i = 0; i<taskArray.length; i++) {	
		var task = taskArray[i];
	
		if (task != null) {
			if (task.info == null) {
				throw "VC Task info is null";
			}
			if (task.info.state == null) {
				throw "VC Task state is null";
			}	
		
			var state = task.info.state.value;
			if (state == "success") {
				taskEndArray[i] = "finished";
			} else if (state == "error") {
				if (task.info.error.localizedMessage == null) {
					throw "Task '" + task.info.name + "' has encountered an unknown error";
				} else {
					throw "Task '" + task.info.name + "' error: "+task.info.error.localizedMessage;
				}
			} else if ((progress) && (state == "running")) {
				if (task.info.progress == null) {
					System.log(task.info.name+" Queued or In Progress...");
				} else {
					System.log(task.info.name+" "+task.info.progress+" %");
				}
			}
		}
		if (task == null) {
			throw "VC Task is null";
		} else if (progress) {
			System.log(task.info.name+" end");
		}
		
	}
	
	allFinished = true;
	for (var i = 0; i<taskArray.length; i++) {	
		if (taskEndArray[i] != "finished") {
			allFinished = false;
		}	
	}
	System.sleep(pollRate*1000);
	
}
for (var i = 0; i<taskArray.length; i++) {	
	var task = taskArray[i];
	if (task != null && task.info != null && task.info.result != null) {
			createdVms.push(VcPlugin.convertToVimManagedObject(task , task.info.result));
	}
}		


