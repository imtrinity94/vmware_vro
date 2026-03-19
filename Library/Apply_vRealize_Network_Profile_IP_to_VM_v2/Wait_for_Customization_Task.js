/**
 * Wait for a VC Task to end.
When task ended, return the task result if any.
 *
 * @param {VC:Task} task - [object Object]
 * @param {boolean} progress - [object Object]
 * @param {number} pollRate - [object Object]
 * @param {string} errorCode
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;