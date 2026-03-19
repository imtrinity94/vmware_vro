/**
 * Disable stretched cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var stretchedClusterSystem = vsanConnection.vsanVcStretchedClusterSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var hostInfo = stretchedClusterSystem.vSANVcGetWitnessHosts(clusterMoRef);
if (hostInfo && hostInfo[0]) {
   var witnessHostMoRef = hostInfo[0].host;
   var vsanTask = stretchedClusterSystem.vSANVcRemoveWitnessHost(clusterMoRef, witnessHostMoRef, null);
   task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
}

