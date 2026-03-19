/**
 * Get vCAC Virtual Machine
 *
 * @param {vCAC:Entity} vitualMachineEntity - [object Object]
 * @return {vCAC:VirtualMachine} vcacVirtualMachine - [object Object]
 */
if (vitualMachineEntity == null) throw "Couldn't find the select virtual machine in the IaaS model.";

vcacVirtualMachine = vitualMachineEntity.getInventoryObject();