/**
 * Get CPU / Memory
 *
 * @param {VC:VirtualMachine} vm
 * @return {number} cpuCount
 * @return {number} memoryMB
 */
cpuCount = vm.summary.config.numCpu;
memoryMB = vm.summary.config.memorySizeMB;