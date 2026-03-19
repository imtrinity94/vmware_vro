/**
 * Wait a VIM 3 Task to end.
When task ended, return the
 *
 * @param {number} pollRate - [object Object]
 * @param {boolean} progress - [object Object]
 * @param {VC:Task} task - [object Object]
 * @return {VC:VirtualMachine} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;