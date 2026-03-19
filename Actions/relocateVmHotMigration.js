/**
 * Relocates a Virtual Machine across clusters or datastores, supporting hot relocation (Live vMotion) 
 * even when hosts do not share storage. Tested with vSphere 6.0+.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vcVirtualMachine - The virtual machine to relocate.
 * @param {VC:Datastore} [targetDatastore] - Target datastore (optional if relocating only compute).
 * @param {VC:VirtualMachineRelocateTransformation} [transformType] - Transformation type (sparse, flat, etc.).
 * @param {VC:HostSystem} targetHost - Target ESXi host (required for powered-on VMs).
 * @param {VC:ResourcePool} targetPool - Target resource pool (required for DRS clusters).
 * @param {VC:VirtualMachineMovePriority} [priorityLevel] - Priority of the vMotion task.
 * @param {VC:DistributedVirtualPortgroup} [targetPortgroup] - Target portgroup if network change is required.
 * @returns {VC:Task} relocationTask - The relocation task object.
 */

var vmRelocateSpec = new VcVirtualMachineRelocateSpec();

if (targetDatastore) {
    vmRelocateSpec.datastore = targetDatastore.reference;
}
if (targetHost) {
    vmRelocateSpec.host = targetHost.reference;
}
if (targetPool) {
    vmRelocateSpec.pool = targetPool.reference;
}

if (targetPortgroup) {
    var networkChangeSpecList = constructNicChangeSpec(vcVirtualMachine, targetPortgroup);
    System.log("Applying network reconfiguration spec for vMotion: " + networkChangeSpecList);
    vmRelocateSpec.deviceChange = networkChangeSpecList;
}

if (transformType) {
    vmRelocateSpec.transform = VcVirtualMachineRelocateTransformation.fromString(transformType.name);
}

System.log("Initiating hot relocation for VM: " + vcVirtualMachine.name);
var relocationTask = vcVirtualMachine.relocateVM_Task(vmRelocateSpec);

return relocationTask;

/**
 * Generates a NIC change spec to move a VM's first supported NIC to a new distributed portgroup.
 */
function constructNicChangeSpec(vm, portgroup) {
    var deviceSpecsArray = []; 
    var nicBackingInfo = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo();
    var portConnSpec = new VcDistributedVirtualSwitchPortConnection();
    
    // Resolve the DVS UUID associated with the portgroup
    var dvSwitchObj = VcPlugin.convertToVimManagedObject(portgroup, portgroup.config.distributedVirtualSwitch);
    portConnSpec.switchUuid = dvSwitchObj.uuid;
    portConnSpec.portgroupKey = portgroup.key;
    nicBackingInfo.port = portConnSpec;
    
    var targetNicIndex = 0; // Targeting the first available NIC
    var vmDevicesList = vm.config.hardware.device;
    var supportedNicCount = 0;
    
    var i;
    for (i = 0; i < vmDevicesList.length; i++) {
        var deviceObj = vmDevicesList[i];
        if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(deviceObj)) {
            if (supportedNicCount === targetNicIndex) {
                var configSpecObj = new VcVirtualDeviceConfigSpec();
                configSpecObj.device = deviceObj;
                configSpecObj.operation = VcVirtualDeviceConfigSpecOperation.edit;
                configSpecObj.device.backing = nicBackingInfo;
                deviceSpecsArray.push(configSpecObj);
                break;
            }
            supportedNicCount++;
        }
    }
    return deviceSpecsArray;
}
