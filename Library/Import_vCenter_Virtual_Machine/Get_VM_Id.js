/**
 * Get VM Id
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {string} vmUuid - [object Object]
 */
vmUuid = vm.config.instanceUuid;
System.log("VM instanceUuid is: " + vmUuid);