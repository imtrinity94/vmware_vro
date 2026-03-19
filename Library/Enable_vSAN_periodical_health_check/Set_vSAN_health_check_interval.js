/**
 * Set vSAN health check interval
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {number} healthCheckInterval
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
healthSystem.vsanHealthSetVsanClusterHealthCheckInterval(clusterMoRef, healthCheckInterval);