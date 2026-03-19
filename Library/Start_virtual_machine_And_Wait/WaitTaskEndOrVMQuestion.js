/**
 * Wait for a VC Task to end or for the VM to ask a question.
Return the task result or the question asked.
 *
 * @param {VC:Task} task - [object Object]
 * @param {boolean} progress - [object Object]
 * @param {number} pollRate - [object Object]
 * @param {VC:VirtualMachine} vm
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").WaitTaskEndOrVMQuestion(task,progress,pollRate,vm) ;