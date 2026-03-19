/**
 * Enable vSAN proactive rebalance
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {number} threshold
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

var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;
configSpec.extendedConfig = new VsanVsanExtendedConfig();
configSpec.extendedConfig.proactiveRebalanceInfo = new VsanVsanProactiveRebalanceInfo();
configSpec.extendedConfig.proactiveRebalanceInfo.enabled = true;
configSpec.extendedConfig.proactiveRebalanceInfo.threshold = threshold;

System.debug("Enabling vSAN proactive rebalance with threshold [" + threshold + "] on cluster: " + cluster.name);
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);