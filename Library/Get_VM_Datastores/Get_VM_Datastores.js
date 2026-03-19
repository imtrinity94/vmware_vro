/**
 * Get VM Datastores
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @return {VC:Datastore} vmHomeDatastore
 * @return {Array/VC:Datastore} disksDatastores
 */
var datastoresInHost = vCenterVM.runtime.host.datastore;

var vmHomeDatastoreName = vCenterVM.config.files.vmPathName.split("]")[0].split("[")[1];
System.log("VM Home Datastore: " + vmHomeDatastoreName);

var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);
var disksNames = new Array();
for (var i in disks) {
    disksNames.push(disks[i].backing.fileName.split("]")[0].split("[")[1]);
    System.log("Disk " + i + " Datastore: " + disksNames[i]);
}

var vmHomeDatastore;
var disksDatastores = new Array();
for each (var datastore in datastoresInHost) {
    if (datastore.name == vmHomeDatastoreName) {
        vmHomeDatastore = datastore;
    }
    for (var i in disksNames) {
        if (datastore.name == disksNames[i]) {
            disksDatastores[i] = datastore;
        }
    }
}
