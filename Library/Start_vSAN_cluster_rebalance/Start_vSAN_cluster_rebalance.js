/**
 * Start vSAN cluster rebalance
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
   throw "VsanConfigError: This cluster is not vSAN enabled";
}

var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var healthSystem  = vsanConnection.vsanVcClusterHealthSystem;

System.debug("Start rebalance on cluster: " + cluster.name);
var vsanTask = healthSystem.vsanRebalanceCluster(clusterMoRef, null);

task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
