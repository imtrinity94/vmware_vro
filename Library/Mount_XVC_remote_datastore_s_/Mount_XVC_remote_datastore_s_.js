/**
 * Mount XVC remote datastore(s)
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/string} xvcremotedatastore
 * @param {string} XVChost
 * @return {VC:Task} task
 */

var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}
var vsan80u1supported = System.getModule("com.vmware.library.vsan").isVsan80u1Supported(cluster);
if (!vsan80u1supported) {
    throw "This feature supports starting from vSAN 80u1, you may need to use a VC version 80u1 or above"
}
var xvcDatastores = [];

if (xvcremotedatastore != null){
for (var i = 0; i < xvcremotedatastore.length; i++) {
   System.debug("Current datastore: " + xvcremotedatastore);
   var curRemotedataStore = xvcremotedatastore[i];
   var xvcDatastore = new VsanVsanXVCDatastoreInfo();
 var index = curRemotedataStore.indexOf('-');
var valuexvc = curRemotedataStore.substring(index + 1);
var xvcMoRef = new VsanManagedObjectReference("Datastore", valuexvc);
System.debug(valuexvc)
   xvcDatastore.datastore = xvcMoRef;
   xvcDatastore.ownerVc = XVChost;
   xvcDatastores.push(xvcDatastore);
}}
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var config = clusterConfigSystem.vsanClusterGetConfig(clusterMoRef);
System.debug(config)
var originalxvcconfig = config.xvcDatastoreConfig;
if (originalxvcconfig == null || originalxvcconfig.xvcDatastores == null) {
    originalxvcconfig = new VsanVsanXVCDatastoreConfig();
    originalxvcconfig.xvcDatastores = xvcDatastores;
} else {
    var originalXvcdatastores = originalxvcconfig.xvcDatastores;
    System.log(originalXvcdatastores);
    if (originalXvcdatastores != null && originalXvcdatastores.length != 0) {
        for (var i = 0; i < xvcDatastores.length; i++) {
            for (var j = 0; j < originalXvcdatastores.length; j++ ) {
                if ((originalXvcdatastores[j].ownerVc == xvcDatastores[i].ownerVc) && (originalXvcdatastores[j].datastore == xvcDatastores[i].datastore)) {
                    throw ("The datastore " + xvcDatastores[i] + "has already been mounted.");
                }
            }     
        }
        xvcDatastores = xvcDatastores.concat(originalXvcdatastores);
    }
    originalxvcconfig.xvcDatastores = xvcDatastores;
}

var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;
configSpec.xvcDatastoreConfig = originalxvcconfig;
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);

