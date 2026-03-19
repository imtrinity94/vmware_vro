/**
 * Get VM UUID
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {string} vmUuid - [object Object]
 */
// Set the UUID of the VM with the instance id.
vmUuid = vm.instanceId;
System.log("VM UUID - " + vmUuid);