/**
 * Return Datastore and VM
 *
 * @param {Array/VC:VirtualMachine} newVMs
 * @param {VC:Datastore} datastore1 - [object Object]
 * @return {VC:Datastore} datastore - [object Object]
 * @return {VC:VirtualMachine} newVM
 */
datastore = datastore1;
newVM = newVMs[0];
System.log("New VM '" + newVM.name + "' created successfully.");