//Find at https://vbombarded.wordpress.com/2018/03/20/cross-vcenter-vmotion-with-vrealize-orchestrator/
var serviceLocator = createServiceLocator(destinationCluster,username,password,destThumbprint);
var relocateSpec = createRelocateSpec(vm,destinationCluster,destDVPortgroup,destDatastore,destFolder,serviceLocator);
System.log("Start migration of VM " + vm);
var relocateVmTask = vm.relocateVM_Task(relocateSpec);
System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(relocateVmTask,true,15);
 
//////FUNCTIONS//////
function createServiceLocator(destinationCluster,username,password,destThumbprint) {
    //In testing I found that cut and pasting thumbprints would often capture hidden unicode left to right mark characters. This next line removes them if present:
    var thumbprint = destThumbprint.replace(/‎|\u200E/gi,"");
    //If the thumbprint was entered with spaces, replace them with colons
    if (thumbprint.indexOf(" ") > -1) {
        thumbprint = thumbprint.replace(/ /g,":");
    }
    var vc = destinationCluster.sdkConnection;
    var serviceLocator = new VcServiceLocator();
    serviceLocator.credential = new VcServiceLocatorNamePassword();
    serviceLocator.credential.username = username;
    serviceLocator.credential.password = password;
    serviceLocator.instanceUuid = vc.instanceUuid;
    serviceLocator.sslThumbprint = thumbprint.trim();
    serviceLocator.url = vc.name;
    return serviceLocator;
}
 
function createRelocateSpec(vm,destinationCluster,destDVPortgroup,destDatastore,destFolder,serviceLocator) {
    var relocateSpec = new VcVirtualMachineRelocateSpec();
    relocateSpec.datastore = destDatastore;
    relocateSpec.pool = destinationCluster.resourcePool;
    //Select random host from cluster as the destinaton
    relocateSpec.host = destinationCluster.host[Math.floor(Math.random() * destinationCluster.host.length)];
    if (destFolder) { relocateSpec.folder = destFolder }
 
    var devices = vm.config.hardware.device;
    var arr = [];
    arr.push (new VcVirtualDeviceConfigSpec());
    relocateSpec.deviceChange = arr;
    relocateSpec.deviceChange[0] = new VcVirtualDeviceConfigSpec();
    relocateSpec.deviceChange[0].operation = VcVirtualDeviceConfigSpecOperation.edit;
    j = 0;
    for (var i in devices) {
        if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(devices[i])) {
            relocateSpec.deviceChange[0].device = devices[i];
            var destBacking = getDestBacking(destDVPortgroup);
            relocateSpec.deviceChange[0].device.backing = destBacking;
            j++;
        }
    }
    if (j > 1) { throw "This workflow does not support the migration of multi-NIC VMs. Your VM has: " + j + " NICs." }
    relocateSpec.service = serviceLocator;
    return relocateSpec;
}
 
function getDestBacking(destDVPortgroup) {
    var destBacking = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo() ;
    destBacking.port =  new VcDistributedVirtualSwitchPortConnection();
    destBacking.port.switchUuid = destDVPortgroup.config.distributedVirtualSwitch.uuid;
    destBacking.port.portgroupKey = destDVPortgroup.moref.value;
    return destBacking;
}
