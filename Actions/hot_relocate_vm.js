/**
 * Relocates a Virtual Machine across clusters or datastores, supporting hot relocation (Live vMotion) 
 * even when hosts do not share storage. Tested with vSphere 6.0+.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm The virtual machine to relocate.
 * @param {VC:Datastore} [datastore] Target datastore (optional if relocating only compute).
 * @param {VC:VirtualMachineRelocateTransformation} [transform] Transformation type (sparse, flat, etc.).
 * @param {VC:HostSystem} host Target ESXi host (required for powered-on VMs).
 * @param {VC:ResourcePool} pool Target resource pool (required for DRS clusters).
 * @param {VC:VirtualMachineMovePriority} [movePriority] Priority of the vMotion task.
 * @param {VC:DistributedVirtualPortgroup} [dvPortgroup] Target portgroup if network change is required.
 * @returns {VC:Task} The relocation task object.
 */

var relocateSpec = new VcVirtualMachineRelocateSpec();

if (datastore != null) {
    relocateSpec.datastore = datastore.reference;
}
if (host != null) {
    relocateSpec.host = host.reference;
}
if (pool != null) {
    relocateSpec.pool = pool.reference;
}
if (dvPortgroup != null) {
    var changespec = getNicChangeSpec(vm, dvPortgroup);
    System.log("Applying network change spec: " + changespec);
    relocateSpec.deviceChange = changespec;
}

if (transform != null) {
    relocateSpec.transform = VcVirtualMachineRelocateTransformation.fromString(transform.name);
}

return vm.relocateVM_Task(relocateSpec);

/**
 * Generates a NIC change spec to move a VM's first supported NIC to a new distributed portgroup.
 * @private
 */
function getNicChangeSpec(vm, dvPortgroup) {
    var nicArray = new Array(); 
    var nicBacking = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo();
    var portConnection = new VcDistributedVirtualSwitchPortConnection();
    
    // Get the UUID of the distributed virtual switch hosting the portgroup
    var dvSwitch = VcPlugin.convertToVimManagedObject(dvPortgroup, dvPortgroup.config.distributedVirtualSwitch);
    portConnection.switchUuid = dvSwitch.uuid;
    portConnection.portgroupKey = dvPortgroup.key;
    nicBacking.port = portConnection;
    
    var nicNumber = 0; // Targeting the first NIC
    var devices = vm.config.hardware.device;
    var actualPos = 0;
    
    for (var i in devices) {
        if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(devices[i])) {
            if (actualPos++ == nicNumber) {
                var devicespec = new VcVirtualDeviceConfigSpec();
                devicespec.device = devices[i];
                devicespec.operation = VcVirtualDeviceConfigSpecOperation.edit;
                devicespec.device.backing = nicBacking;
                nicArray.push(devicespec);
                break;
            }
        }
    }
    return nicArray;
}
