/**
 * Log
 *
 * @param {boolean} alreadyProtected
 * @param {CS:VirtualMachine} csVM - [object Object]
 * @return {Array/CS:VirtualMachine} csVMs - [object Object]
 */
System.log("Is VM already protected? "+alreadyProtected);

// add the VM as a list.
csVMs = new Array();
csVMs.push(csVM);