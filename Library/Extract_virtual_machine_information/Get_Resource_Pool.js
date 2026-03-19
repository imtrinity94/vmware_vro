/**
 * Get Resource Pool
 *
 * @param {VC:VirtualMachine} vm
 * @return {string} resourcePoolName
 * @return {string} resourcePoolId
 * @return {VC:ResourcePool} resourcePool
 */
resourcePool = vm.resourcePool;
resourcePoolName = resourcePool.name;
resourcePoolId = resourcePool.sdkId;