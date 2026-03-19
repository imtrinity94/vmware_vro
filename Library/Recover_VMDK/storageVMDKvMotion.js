/**
 * Storage vMotion for given VMDK file
 *
 * @param {VC:Datastore} targetDatastore - [object Object]
 * @param {number} diskKey - [object Object]
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.vmware.vcenter").storageVMDKvMotion(targetDatastore,diskKey,vm) ;