/**
 * Create ressouce pool
 *
 * @param {VC:ResourcePool} resourcePool
 * @param {string} name
 * @param {boolean} cpuAllocationExpandableReservation
 * @param {number} cpuAllocationLimit
 * @param {number} cpuAllocationReservation
 * @param {VC:SharesLevel} cpuAllocationSharesLevel
 * @param {number} cpuAllocationSharesShares
 * @param {boolean} memoryAllocationExpandableReservation
 * @param {number} memoryAllocationLimit
 * @param {number} memoryAllocationReservation
 * @param {VC:SharesLevel} memoryAllocationSharesLevel
 * @param {number} memoryAllocationSharesShares
 * @return {VC:ResourcePool} newResourcePool
 */
if (resourcePool == null) {
	throw "ReferenceError: Resource pool may not be null";
}
else if (name == null || name == "") {
	throw "ReferenceError: Name may not be null";
}
else {
	var resourceConfigSpec = new VcResourceConfigSpec();
	
	// CPU Allocation
	resourceConfigSpec.cpuAllocation = new VcResourceAllocationInfo();
	if (cpuAllocationExpandableReservation != null)
		resourceConfigSpec.cpuAllocation.expandableReservation = cpuAllocationExpandableReservation;
	else
		resourceConfigSpec.cpuAllocation.expandableReservation = true;
	if (cpuAllocationLimit != null)
		resourceConfigSpec.cpuAllocation.limit = cpuAllocationLimit;		
	else 
		resourceConfigSpec.cpuAllocation.limit = -1;
	if (cpuAllocationReservation != null)
		resourceConfigSpec.cpuAllocation.reservation = cpuAllocationReservation;
	else
		resourceConfigSpec.cpuAllocation.reservation = 0;
	resourceConfigSpec.cpuAllocation.shares = new VcSharesInfo();
	if (cpuAllocationSharesLevel != null)
		resourceConfigSpec.cpuAllocation.shares.level = VcSharesLevel.fromString(cpuAllocationSharesLevel.name);
	else
		resourceConfigSpec.cpuAllocation.shares.level = VcSharesLevel.normal;
	if (cpuAllocationSharesShares != null)
		resourceConfigSpec.cpuAllocation.shares.shares = cpuAllocationSharesShares;
	else
		resourceConfigSpec.cpuAllocation.shares.shares = 0; // ingored
	
//		Memory allocation
	resourceConfigSpec.memoryAllocation = new VcResourceAllocationInfo();
	if (memoryAllocationExpandableReservation != null)
		resourceConfigSpec.memoryAllocation.expandableReservation = memoryAllocationExpandableReservation;
	else
		resourceConfigSpec.memoryAllocation.expandableReservation = true;
	if (memoryAllocationLimit != null)
		resourceConfigSpec.memoryAllocation.limit = memoryAllocationLimit;		
	else 
		resourceConfigSpec.memoryAllocation.limit = -1;
	if (memoryAllocationReservation != null)
		resourceConfigSpec.memoryAllocation.reservation = memoryAllocationReservation;
	else
		resourceConfigSpec.memoryAllocation.reservation = 0;
	resourceConfigSpec.memoryAllocation.shares = new VcSharesInfo();
	if (memoryAllocationSharesLevel != null)
		resourceConfigSpec.memoryAllocation.shares.level = VcSharesLevel.fromString(memoryAllocationSharesLevel.name);
	else
		resourceConfigSpec.memoryAllocation.shares.level = VcSharesLevel.normal;
	if (memoryAllocationSharesShares != null)
		resourceConfigSpec.memoryAllocation.shares.shares = memoryAllocationSharesShares;
	else
		resourceConfigSpec.memoryAllocation.shares.shares = 0; // ingored
	
	newResourcePool = resourcePool.createResourcePool(name, resourceConfigSpec);
}