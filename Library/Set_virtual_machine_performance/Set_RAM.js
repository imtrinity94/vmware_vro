/**
 * Set RAM
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:SharesLevel} ramSharesLevel
 * @param {number} ramShares
 * @param {number} ramReservation
 * @param {number} ramLimit
 */
if ( ramSharesLevel == VcSharesLevel.custom ) {
	if ( ramShares == null || ramReservation == null || ramLimit == null) {
		throw ("Error in RAM parameters. At least one parameter was not set");
	}
}


System.log("Set RAM ressources: sharedModel=" + ramSharesLevel.name + ", share=" + ramShares + ", reservation=" +  ramReservation + ", limit=" + ramLimit);
Server.log("Set RAM ressources", "sharedModel=" + ramSharesLevel.name + ", share=" + ramShares + ", reservation=" +  ramReservation + ", limit=" + ramLimit);

var ramSharesInfo = System.getModule("com.vmware.library.vc.spec").getSharesInfo(ramSharesLevel,ramShares);
var ramResourceAllocationInfo = System.getModule("com.vmware.library.vc.spec").getResourceAllocationInfo(true,ramLimit,ramReservation,ramSharesInfo);

var virtualMachineConfigSpec = new VcVirtualMachineConfigSpec();
virtualMachineConfigSpec.memoryAllocation = ramResourceAllocationInfo;		
var task = vm.reconfigVM_Task(virtualMachineConfigSpec);	

System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,false,5);