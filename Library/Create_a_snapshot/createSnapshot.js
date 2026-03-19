/**
 * Creates a new snapshot of this virtual machine. As a side effect, this updates the current snapshot. 
Any % (percent) character used in this name parameter must be escaped, unless it is used to start an escape sequence. Clients may also escape any other characters in this name parameter.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {boolean} quiesce - [object Object]
 * @param {string} name - [object Object]
 * @param {boolean} memory - [object Object]
 * @param {string} description - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.snapshot").createSnapshot(vm,name,description,memory,quiesce) ;