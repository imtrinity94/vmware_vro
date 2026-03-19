/**
 * Add or Update Properties
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {vCAC:VCACHost} iaasHost
 * @param {Array/string} propertiesNames
 * @param {Array/string} propertiesValues
 */
var vmEntity = System.getModule("com.vmware.library.vcac").getVirtualMachineByUniqueId(iaasHost, vCenterVM.config.instanceUuid);
if (vmEntity == null) {
	throw "Can't find the vcac vm entity";
}

for (var i in propertiesNames) {
    System.getModule("com.vmware.library.vcac").addUpdatePropertyFromVirtualMachineEntity(iaasHost, vmEntity, propertiesNames[i], propertiesValues[i], false, false, false, false) ;
}
