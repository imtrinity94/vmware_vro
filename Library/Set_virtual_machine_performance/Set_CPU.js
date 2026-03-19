/**
 * Set CPU
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:SharesLevel} cpuSharesLevel
 * @param {number} cpuShares
 * @param {number} cpuReservation
 * @param {number} cpuLimit
 */
if ( cpuSharesLevel == VcSharesLevel.custom ) {
	if ( cpuShares == null || cpuReservation == null || cpuLimit == null) {
		throw ("Error in cpu parameters. At least one parameter was not set");
	}
}



System.log("Set CPU ressources: sharedModel=" + cpuSharesLevel.name + ", share=" + cpuShares + ", reservation=" +  cpuReservation + ", limit=" + cpuLimit);
Server.log("Set CPU ressources", "sharedModel=" + cpuSharesLevel.name + ", share=" + cpuShares + ", reservation=" +  cpuReservation + ", limit=" + cpuLimit);

var cpuSharesInfo = System.getModule("com.vmware.library.vc.spec").getSharesInfo(cpuSharesLevel,cpuShares);
var cpuResourceAllocationInfo = System.getModule("com.vmware.library.vc.spec").getResourceAllocationInfo(true,cpuLimit,cpuReservation,cpuSharesInfo);
	

var virtualMachineConfigSpec = new VcVirtualMachineConfigSpec();
virtualMachineConfigSpec.cpuAllocation = cpuResourceAllocationInfo;		
var task = vm.reconfigVM_Task(virtualMachineConfigSpec);	
System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,false,5);