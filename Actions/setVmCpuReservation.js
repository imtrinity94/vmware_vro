/**
 * @description Reconfigures a Virtual Machine's CPU reservation.
 *              Sets the CPU allocation shares to "normal" and applies the reservation.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm Virtual Machine Object.
 * @returns {VC:Task} cpuReconfigTask - Reconfiguration task.
 */

var vmConfigSpec = new VcVirtualMachineConfigSpec();
var resourceAllocation = new VcResourceAllocationInfo();
var sharesInfo = new VcSharesInfo();

sharesInfo.shares = 1000;
sharesInfo.level = VcSharesLevel("normal");
resourceAllocation.shares = sharesInfo;

vmConfigSpec.cpuAllocation = resourceAllocation;
vmConfigSpec.cpuAllocation.reservation = 0; // Value is typically set via workflow input

var cpuReconfigTask = vm.reconfigVM_Task(vmConfigSpec);
return cpuReconfigTask;
