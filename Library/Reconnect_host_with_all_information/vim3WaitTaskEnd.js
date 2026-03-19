/**
 * Wait a VIM 3 Task to end.
When task ended, return the
 *
 * @param {VC:Task} task - [object Object]
 * @param {boolean} progress - [object Object]
 * @param {number} pollRate - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;