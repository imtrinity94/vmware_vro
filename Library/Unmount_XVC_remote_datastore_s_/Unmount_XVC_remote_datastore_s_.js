/**
 * Unmount XVC remote datastore(s)
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/string} xvcremotedatastore
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
   var curRemotedataStore = JSON.parse(xvcremotedatastore[i]);
   var xvcDatastore = new VsanVsanXVCDatastoreInfo();

var xvcMoRef = new VsanManagedObjectReference("Datastore", curRemotedataStore.datastore);
   xvcDatastore.datastore = xvcMoRef;
   xvcDatastore.ownerVc = curRemotedataStore.ownerVc;
   xvcDatastores.push(xvcDatastore);
}}
System.debug(xvcDatastores)
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var config = clusterConfigSystem.vsanClusterGetConfig(clusterMoRef);
//System.debug(config)
var originalxvcconfig = config.xvcDatastoreConfig;
if (originalxvcconfig == null || originalxvcconfig.xvcDatastores == null) {
throw ("There is no mounted XVC remote datastore")
} else {
var originalxvcdatastores = originalxvcconfig.xvcDatastores;
System.debug(originalxvcdatastores)

var aftermountxvcdatastore = []
for (var i = 0; i < originalxvcdatastores.length; i++) {
  for (var j = 0; j < xvcDatastores.length; j++) {
		var curxvc = originalxvcdatastores[i]


		if (!(curxvc.ownerVc == xvcDatastores[j].ownerVc && curxvc.datastore.value == xvcDatastores[j].datastore.value)) {

		    aftermountxvcdatastore.push(curxvc)
		}
	}
}

            System.debug(aftermountxvcdatastore)
originalxvcconfig.xvcDatastores = aftermountxvcdatastore;
System.debug(originalxvcconfig)
}

var configSpec = new VsanVimVsanReconfigSpec();
//var vsanXVCDatastoreConfig = new VsanVsanXVCDatastoreConfig();
//vsanXVCDatastoreConfig.xvcDatastores = xvcDatastores;
configSpec.modify = true;
configSpec.xvcDatastoreConfig = originalxvcconfig;

System.debug("Enabling vSAN on cluster: " + cluster.name);
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
