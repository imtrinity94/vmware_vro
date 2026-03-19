/**
 * Wait for a vCenter Server task to end.
When task endsd return the task result if any.
 *
 * @param {VC:Task} task - [object Object]
 * @param {number} pollRate - [object Object]
 * @param {boolean} progress - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;