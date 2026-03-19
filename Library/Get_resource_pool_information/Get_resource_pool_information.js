/**
 * Get resource pool information
 *
 * @param {VC:ResourcePool} resourcePool
 * @return {boolean} cpuAllocationExpandableReservation
 * @return {number} cpuAllocationLimit
 * @return {number} cpuAllocationReservation
 * @return {string} cpuAllocationSharesLevel
 * @return {number} cpuAllocationSharesShares
 * @return {boolean} memoryAllocationExpandableReservation
 * @return {number} memoryAllocationLimit
 * @return {number} memoryAllocationReservation
 * @return {string} memoryAllocationSharesLevel
 * @return {number} memoryAllocationSharesShares
 */
var resourceConfigSpec = resourcePool.config;

// CPU Allocation
cpuAllocationExpandableReservation = resourceConfigSpec.cpuAllocation.expandableReservation;
cpuAllocationLimit = resourceConfigSpec.cpuAllocation.limit;		
cpuAllocationReservation = resourceConfigSpec.cpuAllocation.reservation;
cpuAllocationSharesLevel = resourceConfigSpec.cpuAllocation.shares.level.name;
cpuAllocationSharesShares =	resourceConfigSpec.cpuAllocation.shares.shares;
// Memory Allocation
memoryAllocationExpandableReservation =	resourceConfigSpec.memoryAllocation.expandableReservation;
memoryAllocationLimit =	resourceConfigSpec.memoryAllocation.limit;		
memoryAllocationReservation = resourceConfigSpec.memoryAllocation.reservation;
memoryAllocationSharesLevel = resourceConfigSpec.memoryAllocation.shares.level.name;
memoryAllocationSharesShares = resourceConfigSpec.memoryAllocation.shares.shares;
