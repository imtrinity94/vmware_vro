/**
 * Update HCL database
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} url
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

var healthSystem = vsanConnection.vsanVcClusterHealthSystem;
if (!url){
   url = null;
}
var vsanTask = healthSystem.vsanVcUpdateHclDbFromWeb(url);

task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);