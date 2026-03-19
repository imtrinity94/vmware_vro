/**
 * Get Hostsystem
 *
 * @param {VC:VirtualMachine} vm
 * @return {string} runningHostName
 * @return {string} runningHostId
 * @return {VC:HostSystem} host
 */
host = VcPlugin.convertToVimManagedObject(vm, vm.runtime.host);
runningHostName = host.name;
runningHostId = host.sdkId;