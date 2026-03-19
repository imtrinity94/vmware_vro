/**
 * Remove vSAN silent health check
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/string} silentChecks
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
   throw "VsanConfigError: This cluster is not vSAN enabled";
}

var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var healthSystem = vsanConnection.vsanVcClusterHealthSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);

var vsanTask = healthSystem.vsanHealthSetVsanClusterSilentChecks(clusterMoRef, null, silentChecks);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);