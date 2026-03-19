/**
 * Reconfigures a Virtual Machine's CPU reservation.
 * Sets the CPU allocation shares to "normal" and applies the reservation.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm Virtual Machine Object.
 * @returns {VC:Task} Reconfiguration task.
 */

var myVcVirtualMachineConfigSpec = new VcVirtualMachineConfigSpec();
var myVcResourceAllocationInfo = new VcResourceAllocationInfo();
var myVcSharesInfo = new VcSharesInfo();

myVcSharesInfo.shares = 1000;
myVcSharesInfo.level = VcSharesLevel("normal");
myVcResourceAllocationInfo.shares = myVcSharesInfo;

myVcVirtualMachineConfigSpec.cpuAllocation = myVcResourceAllocationInfo;
myVcVirtualMachineConfigSpec.cpuAllocation.reservation = 0; // Or whatever value is intended, usually reservation is a number

var task = vm.reconfigVM_Task(myVcVirtualMachineConfigSpec);
return task;
