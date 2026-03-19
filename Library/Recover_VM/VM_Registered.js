/**
 * VM Registered
 *
 * @param {Array/VC:VirtualMachine} newVMs
 * @return {boolean} vmCreated
 * @return {VC:VirtualMachine} newVMOut
 * @return {VC:VirtualMachine} newCreatedVm
 * @return {string} newCreatedVmName
 */
if(!newVMs)
{
	vmCreated = false;
}
else{
	vmCreated = true;
	newCreatedVm = newVMs[0];
    newVMOut = newVMs[0];
}
newCreatedVmName = newCreatedVm.name;
if(newVMOut)
{
	System.log("VM '" + newVMOut.name + "' is registered successfully");
	}
