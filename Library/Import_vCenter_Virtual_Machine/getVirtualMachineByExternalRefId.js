/**
 * Gets a virtual machine entity filtered by its ExternalReferenceId property.
 *
 * @param {vCAC:VCACHost} host - [object Object]
 * @param {string} uniqueId - [object Object]
 * @return {vCAC:Entity} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vcac").getVirtualMachineByExternalRefId(host,uniqueId) ;